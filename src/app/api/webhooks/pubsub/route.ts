import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { decrypt } from "@/lib/utils/encryption"
import { getAuthorizedClient } from "@/lib/google/auth"
import { getReview, replyToReview } from "@/lib/google/reply"
import { generateReply } from "@/lib/llm/generate-reply"
import { rateLimit } from "@/lib/utils/rate-limit"
import { logger } from "@/lib/utils/logger"

export async function POST(req: Request) {
  try {
    // Rate limit: 100 requests per minute (return 200 to avoid Pub/Sub retry loops)
    const rl = rateLimit({ key: "pubsub-webhook", limit: 100, windowMs: 60 * 1000 })
    if (!rl.success) {
      logger.warn("Pub/Sub webhook rate limit exceeded")
      return NextResponse.json({ success: true }) // Return 200 to prevent Pub/Sub retries
    }

    const body = await req.json()
    const message = body.message

    // Always acknowledge Pub/Sub immediately unless strictly invalid format
    if (!message || !message.data) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // data is base64 encoded by Pub/Sub
    const decodedData = Buffer.from(message.data, 'base64').toString('utf-8')
    const notification = JSON.parse(decodedData)

    // Example resourceName: 'accounts/{accountId}/locations/{locationId}/reviews/{reviewId}'
    // For newly generated review webhooks from Google
    const resourceName = notification.resourceName

    if (!resourceName || !resourceName.includes('/reviews/')) {
      logger.info("Skipping generic/unrecognized notification", { resourceName })
      return NextResponse.json({ success: true }) // ACK
    }

    // Process review asynchronously to decouple from the 10-second Pub/Sub timeout
    // In Vercel, serverless functions might exit early if we don't await,
    // so we handle it synchronously here but realistically we should use a proper queue for scale
    await processReviewNotification(resourceName)

    return NextResponse.json({ success: true })

  } catch (error) {
    logger.error("Pub/Sub webhook error (returning 200 to prevent retry loop)", { error: (error as Error).message })
    // Always return 200 so PubSub doesn't keep resending the exact same failing payload
    return NextResponse.json({ success: true })
  }
}

async function processReviewNotification(resourceName: string) {
  logger.info("Processing review notification", { resourceName })
  const supabase = createAdminClient()

  // Extract IDS
  // Format: accounts/123/locations/456/reviews/xyz
  const match = resourceName.match(/^accounts\/(.+)\/locations\/(.+)\/reviews\/(.+)$/)
  if (!match) return

  const accountId = `accounts/${match[1]}`
  const locationId = `locations/${match[2]}`

  // 1. Find location and account in DB
  const { data: locationData, error: locError } = await supabase
    .from('locations')
    .select(`
      id, name, auto_reply_enabled, user_id,
      tone_override, offers_override, example_replies_override,
      google_accounts!inner ( access_token_encrypted, refresh_token_encrypted )
    `)
    .eq('google_location_id', `${accountId}/${locationId}`)
    .single()

  if (locError || !locationData || !locationData.auto_reply_enabled) {
    logger.info("Location not found or auto-reply disabled", { locationId })
    return
  }

  // 2. Load User Profile and Brand Settings
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', locationData.user_id)
    .single()

  if (!profile || !['active', 'trialing'].includes(profile.subscription_status)) {
    logger.info("User subscription inactive", { userId: locationData.user_id })
    return
  }

  const { data: brandSettings } = await supabase
    .from('brand_settings')
    .select('*')
    .eq('user_id', locationData.user_id)
    .single()

  if (!brandSettings) {
    logger.info("No brand settings found, skipping", { userId: locationData.user_id })
    return
  }

  // 3. Prevent duplicate processing
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id, reply_status')
    .eq('google_review_id', resourceName)
    .single()

  if (existingReview && existingReview.reply_status !== 'failed') {
    logger.info("Review already processed", { resourceName })
    return
  }

  // 4. Decrypt Token and build Google Auth Client
  const accArr = locationData.google_accounts as { access_token_encrypted: string; refresh_token_encrypted: string }[]
  const acc = accArr[0]
  const accessToken = decrypt(acc.access_token_encrypted)
  const refreshToken = decrypt(acc.refresh_token_encrypted)
  const authClient = getAuthorizedClient(accessToken, refreshToken)

  // 5. Fetch full review from Google
  let reviewData: {
    reviewReply?: unknown
    starRating: string
    comment?: string
    reviewer?: { displayName?: string; profilePhotoUrl?: string }
    createTime?: string
  }
  try {
    reviewData = await getReview(authClient, resourceName)
  } catch (err) {
    logger.error("Failed to fetch Google review", { resourceName, error: (err as Error).message })
    return
  }

  // Check if there's already a reply from the business
  if (reviewData.reviewReply) {
    logger.info("Review already has a reply natively", { resourceName })
    return
  }

  const starRating = parseStarRating(reviewData.starRating)
  const reviewText = reviewData.comment || ''

  // Insert initial review state to 'generating'
  const { data: dbReview } = await supabase
    .from('reviews')
    .upsert({
      location_id: locationData.id,
      user_id: locationData.user_id,
      google_review_id: resourceName,
      reviewer_name: reviewData.reviewer?.displayName,
      reviewer_photo_url: reviewData.reviewer?.profilePhotoUrl,
      star_rating: starRating,
      review_text: reviewText,
      review_created_at: reviewData.createTime,
      reply_status: 'generating'
    }, { onConflict: 'location_id, google_review_id' })
    .select()
    .single()

  // 6. Generate LLM Reply
  let generatedReply = ""
  try {
    generatedReply = await generateReply({
      brandName: brandSettings.brand_name,
      tone: locationData.tone_override || brandSettings.tone,
      toneCustom: brandSettings.tone_custom,
      resolutionOffers: locationData.offers_override || brandSettings.resolution_offers,
      negativeReviewEmail: brandSettings.negative_review_email,
      exampleReplies: locationData.example_replies_override || brandSettings.example_replies,
      reviewerName: reviewData.reviewer?.displayName || "there",
      starRating,
      reviewText,
      locationName: locationData.name
    })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    logger.error("LLM reply generation failed", { reviewId: dbReview?.id, error: errMsg })
    await supabase.from('reviews').update({ reply_status: 'failed', reply_error: errMsg }).eq('id', dbReview?.id)
    return
  }

  // 7. Post Reply to Google
  try {
    await replyToReview(authClient, resourceName, generatedReply)

    // 8. Update DB Success
    await supabase.from('reviews').update({
      reply_status: 'posted',
      reply_text: generatedReply,
      reply_posted_at: new Date().toISOString(),
      llm_model: 'llama3.1'
    }).eq('id', dbReview?.id)

    logger.info("Reply posted successfully", { resourceName, reviewId: dbReview?.id })

  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    logger.error("Failed to post Google generated reply", { resourceName, error: errMsg })
    await supabase.from('reviews').update({ reply_status: 'failed', reply_error: errMsg }).eq('id', dbReview?.id)
  }
}

function parseStarRating(ratingStr: string): number {
  switch (ratingStr) {
    case 'FIVE': return 5
    case 'FOUR': return 4
    case 'THREE': return 3
    case 'TWO': return 2
    case 'ONE': return 1
    default: return 5 // Default assumption if parsing fails
  }
}

import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// DEV ONLY — seeds a mock Google account + location + reviews for testing
// Remove this file before deploying to production
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  const { origin } = new URL(request.url)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // 1. Mock google account
  const { data: account, error: accountError } = await supabase
    .from("google_accounts")
    .upsert({
      user_id: user.id,
      google_account_id: "accounts/mock-dev-account",
      google_email: user.email,
      access_token_encrypted: "mock:mock:mock",
      refresh_token_encrypted: "mock:mock:mock",
      token_expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
      pubsub_configured: false,
    }, { onConflict: "user_id, google_account_id" })
    .select()
    .single()

  if (accountError) {
    return NextResponse.json({ error: accountError.message }, { status: 500 })
  }

  // 2. Mock location
  const { data: location, error: locationError } = await supabase
    .from("locations")
    .upsert({
      user_id: user.id,
      google_account_id: account.id,
      google_location_id: "locations/mock-dev-location",
      name: "Mindmoneyplug — Dubai",
      address: JSON.stringify({ addressLines: ["Muhaisanah 2, Dubai, UAE"] }),
      auto_reply_enabled: true,
    }, { onConflict: "google_account_id, google_location_id" })
    .select()
    .single()

  if (locationError) {
    return NextResponse.json({ error: locationError.message }, { status: 500 })
  }

  // 3. Mock reviews
  await supabase
    .from("reviews")
    .upsert([
      {
        user_id: user.id,
        location_id: location.id,
        google_review_id: "mock-review-1",
        reviewer_name: "Ahmed Al Mansoori",
        star_rating: 5,
        review_text: "Excellent service, very professional and responsive team!",
        reply_status: "posted",
        reply_text: "Thank you so much Ahmed! We really appreciate your kind words.",
        review_created_at: new Date().toISOString(),
      },
      {
        user_id: user.id,
        location_id: location.id,
        google_review_id: "mock-review-2",
        reviewer_name: "Sarah Johnson",
        star_rating: 4,
        review_text: "Great experience overall. Would definitely recommend.",
        reply_status: "pending",
        review_created_at: new Date().toISOString(),
      },
      {
        user_id: user.id,
        location_id: location.id,
        google_review_id: "mock-review-3",
        reviewer_name: "Omar Hassan",
        star_rating: 2,
        review_text: "Waited too long for a response. Not happy with the experience.",
        reply_status: "failed",
        reply_error: "LLM timeout",
        review_created_at: new Date().toISOString(),
      },
    ], { onConflict: "location_id, google_review_id" })

  return NextResponse.redirect(`${origin}/onboarding?step=brand`)
}

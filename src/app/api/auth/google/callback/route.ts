import { getGoogleOAuthClient, getAuthorizedClient } from "@/lib/google/auth"
import { listAccounts, listLocations } from "@/lib/google/business-profile"
import { createClient } from "@/lib/supabase/server"
import { decrypt, encrypt } from "@/lib/utils/encryption"
import { rateLimit } from "@/lib/utils/rate-limit"
import { logger } from "@/lib/utils/logger"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  // Per-IP rate limit: 10 requests per 5 minutes
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"
  const rl = rateLimit({ key: `google-callback:${ip}`, limit: 10, windowMs: 5 * 60 * 1000 })
  if (!rl.success) {
    return NextResponse.redirect(`${origin}/onboarding?error=rate_limited`)
  }

  if (error) {
    logger.error("Google OAuth error", { error })
    return NextResponse.redirect(`${origin}/onboarding?error=${error}`)
  }

  if (!code || !state) {
    return NextResponse.redirect(`${origin}/onboarding?error=missing_params`)
  }

  let userId: string
  try {
    userId = decrypt(state) // Recover user ID from state parameter
  } catch (err) {
    logger.error("Failed to decrypt state parameter", { error: (err as Error).message })
    return NextResponse.redirect(`${origin}/onboarding?error=invalid_state`)
  }

  const oAuth2Client = getGoogleOAuthClient()

  try {
    const supabase = await createClient()

    // Verify user is actually logged in and matches state param
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      return NextResponse.redirect(`${origin}/login?error=unauthorized_oauth_callback`)
    }

    // Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code)

    if (!tokens.access_token || !tokens.refresh_token) {
       throw new Error("Missing access or refresh token from Google")
    }

    // Encrypt the tokens
    const encryptedAccess = encrypt(tokens.access_token)
    const encryptedRefresh = encrypt(tokens.refresh_token)
    const tokenExpiresAt = tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null

    const authClient = getAuthorizedClient(tokens.access_token, tokens.refresh_token)

    // Step 1: Discover Google Accounts
    const accounts = await listAccounts(authClient)

    if (accounts.length === 0) {
      return NextResponse.redirect(`${origin}/onboarding?error=no_business_accounts`)
    }

    // For simplicity in MVP, we grab the first applicable account.
    // robust systems will display them all and let user connect.
    const activeAccount = accounts[0]

    // Save to Google Accounts table
    const { data: dbAccount, error: accountError } = await supabase
      .from("google_accounts")
      .upsert({
        user_id: user.id,
        google_account_id: activeAccount.name,
        access_token_encrypted: encryptedAccess,
        refresh_token_encrypted: encryptedRefresh,
        token_expires_at: tokenExpiresAt,
        pubsub_configured: false, // will set to true when we implement Pub/Sub
      }, { onConflict: "user_id, google_account_id" })
      .select()
      .single()

    if (accountError) throw accountError

    // Step 2: Discover Locations for the Account
    const locations = await listLocations(authClient, activeAccount.name)

    if (locations.length > 0) {
      // Save Locations
      const locationInserts = locations.map(loc => ({
        user_id: user.id,
        google_account_id: dbAccount.id,
        google_location_id: loc.name,
        name: loc.locationName,
        address: loc.address ? JSON.stringify(loc.address) : null,
        auto_reply_enabled: true,
      }))

      const { error: locationsError } = await supabase
        .from("locations")
        .upsert(locationInserts, { onConflict: "google_account_id, google_location_id" })

      if (locationsError) throw locationsError
    }

    // Redirect to next step of onboarding
    return NextResponse.redirect(`${origin}/onboarding?step=brand`)

  } catch (err) {
    const msg = (err as Error).message ?? "unknown"
    logger.error("OAuth Callback processing failed", { error: msg })
    return NextResponse.redirect(`${origin}/onboarding?error=${encodeURIComponent(msg)}`)
  }
}

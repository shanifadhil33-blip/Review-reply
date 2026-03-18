import { getGoogleOAuthClient, OAUTH_SCOPES } from "@/lib/google/auth"
import { createClient } from "@/lib/supabase/server"
import { encrypt } from "@/lib/utils/encryption"
import { rateLimit } from "@/lib/utils/rate-limit"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  // Protect this route – verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Rate limit per user: 5 requests per 5 minutes
  const rl = rateLimit({ key: `google-oauth:${user.id}`, limit: 5, windowMs: 5 * 60 * 1000 })
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const oAuth2Client = getGoogleOAuthClient()

  // Set the access_type to 'offline' so we get a refresh token
  // Use state parameter to pass encrypted user ID for CSRF protection
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: OAUTH_SCOPES,
    prompt: "consent", // Force consent so we always get a refresh token in testing
    state: encrypt(user.id),
  })

  return NextResponse.redirect(authUrl)
}

import { google } from "googleapis"

export function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export const OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
]

/**
 * Creates an authorized Google API client using saved tokens
 */
export function getAuthorizedClient(accessToken: string, refreshToken?: string) {
  const oAuth2Client = getGoogleOAuthClient()
  oAuth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return oAuth2Client
}

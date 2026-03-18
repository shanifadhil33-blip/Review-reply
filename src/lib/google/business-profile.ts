import { google } from "googleapis"
import type { OAuth2Client } from "google-auth-library"

export interface GoogleAccount {
  name: string
  accountName: string
  type: string
}

export interface GoogleLocation {
  name: string
  locationName: string
  storeCode?: string | null
  address?: object | null
}

export async function listAccounts(authClient: OAuth2Client): Promise<GoogleAccount[]> {
  const businessmanagement = google.mybusinessaccountmanagement({
    version: "v1",
    auth: authClient,
  })

  // GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
  const response = await businessmanagement.accounts.list()
  
  return response.data.accounts as GoogleAccount[] || []
}

export async function listLocations(authClient: OAuth2Client, accountId: string): Promise<GoogleLocation[]> {
  const businessinformation = google.mybusinessbusinessinformation({
    version: "v1",
    auth: authClient,
  })

  // GET https://mybusinessbusinessinformation.googleapis.com/v1/{parent=accounts/*}/locations
  const response = await businessinformation.accounts.locations.list({
    parent: accountId,
    readMask: "name,title,storeCode,storefrontAddress",
  })
  
  return (response.data.locations || []).map((loc) => ({
    name: loc.name ?? '',
    locationName: loc.title ?? '',
    storeCode: loc.storeCode,
    address: loc.storefrontAddress,
  }))
}

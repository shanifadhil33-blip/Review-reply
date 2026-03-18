import type { OAuth2Client } from "google-auth-library"

export async function replyToReview(
  authClient: OAuth2Client,
  reviewId: string,
  replyText: string
) {
  // According to current Google APIs, the endpoint is:
  // PUT https://mybusiness.googleapis.com/v4/{name}/reply
  // We use the raw authClient.request for compatibility with the v4 reviews endpoint.
  const url = `https://mybusiness.googleapis.com/v4/${reviewId}/reply`

  const response = await authClient.request({
    url,
    method: 'PUT',
    data: {
      comment: replyText,
    }
  })

  return response.data
}

export async function deleteReply(
  authClient: OAuth2Client,
  reviewId: string
) {
  const url = `https://mybusiness.googleapis.com/v4/${reviewId}/reply`

  const response = await authClient.request({
    url,
    method: 'DELETE',
  })

  return response.data
}

export async function getReview(
  authClient: OAuth2Client,
  reviewId: string
) {
  const url = `https://mybusiness.googleapis.com/v4/${reviewId}`

  const response = await authClient.request({
    url,
    method: 'GET',
  })

  return response.data
}

export async function listReviews(
  authClient: OAuth2Client,
  locationId: string,
  pageToken?: string
) {
  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews`

  const response = await authClient.request({
    url,
    method: 'GET',
    params: {
      pageToken
    }
  })

  return response.data
}

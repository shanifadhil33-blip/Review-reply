import type { OAuth2Client } from "google-auth-library"

/**
 * Configure Pub/Sub notifications for a Google Business Profile account
 */
export async function updateNotificationSettings(
  authClient: OAuth2Client,
  accountId: string, // e.g., 'accounts/123456789'
  pubsubTopic: string // e.g., 'projects/my-project/topics/my-topic'
) {
  // PATCH https://mybusinessaccountmanagement.googleapis.com/v1/{name=accounts/*}/notifications
  const url = `https://mybusiness.googleapis.com/v4/${accountId}/notifications`

  // We are requesting notifications for NEW_REVIEW updates
  const response = await authClient.request({
    url,
    method: 'PUT', // or PATCH
    data: {
      topicName: pubsubTopic,
      notificationTypes: ["NEW_REVIEW"],
    }
  })

  return response.data
}

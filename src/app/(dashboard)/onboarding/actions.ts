"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveBrandSettings(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from('brand_settings')
    .upsert({
      user_id: user.id,
      brand_name: formData.get("brandName") as string,
      tone: formData.get("tone") as string,
      tone_custom: (formData.get("toneCustom") as string) || null,
      resolution_offers: (formData.get("resolutionOffers") as string) || null,
      negative_review_email: (formData.get("negativeReviewEmail") as string) || null,
    }, { onConflict: "user_id" })

  if (error) {
    console.error("Error saving brand settings:", error)
    return { success: false, error: "Failed to save brand settings" }
  }

  return { success: true }
}

export async function confirmLocations() {
  // In a real implementation this might trigger the PubSub setup task or initial historical review sync
  // For MVP, we just acknowledge the user has completed onboarding.
  return { success: true }
}

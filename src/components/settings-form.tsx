"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { saveBrandSettings } from "@/app/(dashboard)/onboarding/actions"
import { toast } from "sonner"
import { useState } from "react"

interface BrandSettings {
  brand_name?: string | null
  tone?: string | null
  tone_custom?: string | null
  resolution_offers?: string | null
  negative_review_email?: string | null
}

interface SettingsFormProps {
  brandSettings: BrandSettings | null
}

export function SettingsForm({ brandSettings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await saveBrandSettings(formData)
    if (result.success) {
      toast.success("Settings saved.")
    } else {
      toast.error(result.error ?? "Failed to save. Try again.")
    }
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          name="brandName"
          defaultValue={brandSettings?.brand_name ?? ""}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tone">Primary Tone</Label>
          <span className="text-xs text-zinc-400">Optional</span>
        </div>
        <Select name="tone" defaultValue={brandSettings?.tone ?? "Professional & warm"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-950 text-white ring-0 shadow-xl" align="start">
            <SelectItem value="Professional & warm" className="focus:bg-zinc-800 focus:text-white text-zinc-100">Professional & Warm</SelectItem>
            <SelectItem value="Casual & friendly" className="focus:bg-zinc-800 focus:text-white text-zinc-100">Casual & Friendly</SelectItem>
            <SelectItem value="Enthusiastic & energetic" className="focus:bg-zinc-800 focus:text-white text-zinc-100">Enthusiastic & Energetic</SelectItem>
            <SelectItem value="Formal & polite" className="focus:bg-zinc-800 focus:text-white text-zinc-100">Formal & Polite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="toneCustom">Custom Tone Instructions</Label>
          <span className="text-xs text-zinc-400">Optional</span>
        </div>
        <Textarea
          id="toneCustom"
          name="toneCustom"
          defaultValue={brandSettings?.tone_custom ?? ""}
          className="resize-none h-20"
        />
        <p className="text-xs text-muted-foreground">Specific rules for the LLM. Ex: &quot;Never guarantee a refund, always invite them back.&quot;</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="resolutionOffers">Resolution Offers (1–3 star reviews)</Label>
          <span className="text-xs text-zinc-400">Optional</span>
        </div>
        <Textarea
          id="resolutionOffers"
          name="resolutionOffers"
          defaultValue={brandSettings?.resolution_offers ?? ""}
          className="resize-none h-20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="negativeReviewEmail">Support Escalation Email</Label>
        <Input
          id="negativeReviewEmail"
          name="negativeReviewEmail"
          defaultValue={brandSettings?.negative_review_email ?? ""}
          type="email"
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <Button type="submit" className="gap-2" disabled={loading}>
          {loading ? (
            <>Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Preferences</>
          )}
        </Button>
      </div>
    </form>
  )
}

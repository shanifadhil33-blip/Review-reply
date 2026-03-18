import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { MessageSquare } from "lucide-react"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = { title: "Settings" }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: brandSettings } = await supabase
    .from("brand_settings")
    .select("*")
    .eq("user_id", user?.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your brand voice and reply preferences.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-100">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-zinc-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-950">Brand Voice</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Configure how ReviewReply responds to your customers.</p>
          </div>
        </div>

        <SettingsForm brandSettings={brandSettings} />
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Store, MapPin } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = { title: "Locations" }

export default async function LocationsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Locations</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your connected Google Business Profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations?.map((location) => {
          const address = location.address ? JSON.parse(location.address) : {}
          const formattedAddress = address.addressLines
            ? address.addressLines.join(", ")
            : "No address provided"

          return (
            <div
              key={location.id}
              className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <Store className="w-5 h-5 text-zinc-600" />
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    location.auto_reply_enabled
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      location.auto_reply_enabled ? "bg-emerald-500" : "bg-zinc-400"
                    }`}
                  />
                  {location.auto_reply_enabled ? "Active" : "Paused"}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-950 text-sm line-clamp-1">
                  {location.name}
                </h3>
                <div className="flex items-start gap-1.5 mt-1.5 text-xs text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <p className="line-clamp-2">{formattedAddress}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-600">Auto-Reply</span>
                <Switch
                  checked={location.auto_reply_enabled}
                  aria-label="Toggle auto-reply"
                />
              </div>
            </div>
          )
        })}

        {locations?.length === 0 && (
          <div className="col-span-full bg-white border border-zinc-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="font-semibold text-zinc-950 mb-1.5">No locations found</h3>
            <p className="text-sm text-zinc-500 max-w-sm">
              We couldn&apos;t find any Business Profiles connected to your Google account. Ensure you are an owner or manager.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { BarChart3 } from "lucide-react"

export const metadata: Metadata = { title: "Analytics" }

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-1">Track your reputation growth over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-2xl p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Reviews Replied</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-zinc-950 tracking-tight">0</span>
            <span className="text-sm font-medium text-zinc-400">total</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Average Rating</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-zinc-950 tracking-tight">—</span>
            <span className="text-sm font-medium text-zinc-400">/ 5.0</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Avg Response Time</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-zinc-950 tracking-tight">&lt;15s</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
          <BarChart3 className="w-6 h-6 text-zinc-400" />
        </div>
        <h3 className="font-semibold text-zinc-950 mb-1.5">Not enough data yet</h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          Once ReviewReply starts responding to your reviews, charts and insights will appear here.
        </p>
      </div>
    </div>
  )
}

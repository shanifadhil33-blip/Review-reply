"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Will the AI replies actually sound like my brand?",
    a: "You set your brand tone during a 2-minute setup — professional, casual, friendly, or fully custom. Every reply is generated in that exact voice. You can also add example replies so the AI learns how you talk.",
  },
  {
    q: "What if the AI posts a bad reply?",
    a: "Every reply is visible in your dashboard. You can delete any reply with one click and it's removed from Google instantly. You can also pause auto-replies globally or per location anytime.",
  },
  {
    q: "Does ReviewReply have access to my Google account?",
    a: "Only to your business reviews. We use Google's official Business Profile API with the minimum permissions needed to read reviews and post replies. We never touch your ads, analytics, or anything else.",
  },
  {
    q: "How long does setup take?",
    a: "Under 5 minutes. Connect your Google Business Profile, set your brand tone, and you're done. ReviewReply starts replying to new reviews immediately.",
  },
  {
    q: "Do I need to approve each reply before it's posted?",
    a: "No — that's the whole point. Replies are generated and posted automatically in under 15 seconds. Everything is logged in your dashboard if you want to review them after.",
  },
  {
    q: "Does it work for businesses with multiple locations?",
    a: "Built for it. Whether you have 3 locations or 300, one connection covers all of them. Each location is $29/month with its own auto-reply and optional tone customization.",
  },
  {
    q: "How does pricing work?",
    a: "$29/month per location. One location, $29. Ten locations, $290. Each location gets unlimited reviews and unlimited replies. No per-reply fees, no hidden charges. Add or remove locations anytime and your bill adjusts automatically.",
  },
  {
    q: "Is the free trial actually free?",
    a: "Yes. 30 days, full access across all your locations, no credit card required. If you don't upgrade, auto-replies simply pause.",
  },
  {
    q: "What happens if I cancel?",
    a: "Auto-replies stop. Your existing replies stay on Google — we never delete them. You can reactivate anytime and pick up right where you left off.",
  },
  {
    q: "What about existing reviews?",
    a: "ReviewReply handles new reviews from the moment you connect. It does not reply to old reviews — only fresh ones going forward.",
  },
]

export default function FaqModal() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-zinc-800 bg-white border border-zinc-200 px-4 py-1.5 rounded-full shadow-[0_3px_0_0_#d4d4d8] hover:shadow-[0_1px_0_0_#d4d4d8] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-100"
      >
        FAQs
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-[2rem] p-8 shadow-xl w-full max-w-xl max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-6">Frequently Asked Questions</h2>

            <div className="flex flex-col divide-y divide-zinc-100">
              {faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <button
                    className="w-full flex items-center justify-between gap-4 text-left"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <span className="text-sm font-semibold text-zinc-900">{faq.q}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 text-zinc-400 transition-transform duration-200 ${expanded === i ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  {expanded === i && (
                    <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

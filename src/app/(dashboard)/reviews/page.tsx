import type { Metadata } from "next"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Star, MessageCircle, AlertCircle, CheckCircle2, CopyPlus, Trash2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Reviews" }

export default async function ReviewsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      locations ( name )
    `)
    .eq("user_id", user?.id)
    .order("review_created_at", { ascending: false })
    .limit(50)

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "posted":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="w-3 h-3" /> Replied
          </span>
        )
      case "generating":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
            <CopyPlus className="w-3 h-3 animate-pulse" /> Writing…
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700">
            <AlertCircle className="w-3 h-3" /> Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">
            <MessageCircle className="w-3 h-3" /> Pending
          </span>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Reviews</h1>
        <p className="text-sm text-zinc-500 mt-1">See what your customers are saying and how AI responds.</p>
      </div>

      <div className="flex flex-col gap-3">
        {reviews?.map((review) => {
          const loc = review.locations as { name: string } | null
          const initial = review.reviewer_name ? review.reviewer_name.charAt(0).toUpperCase() : "?"

          return (
            <div
              key={review.id}
              className="bg-white border border-zinc-200 rounded-2xl p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Review */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-3 items-start justify-between">
                    <div className="flex items-center gap-3">
                      {review.reviewer_photo_url ? (
                        <Image
                          src={review.reviewer_photo_url}
                          alt="Reviewer"
                          width={36}
                          height={36}
                          className="rounded-full border border-zinc-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-semibold text-zinc-600 shrink-0">
                          {initial}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">
                          {review.reviewer_name || "Anonymous"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                          <span className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.star_rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-zinc-200 fill-zinc-200"
                                }`}
                              />
                            ))}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 truncate max-w-[140px]">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {loc?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={review.reply_status} />
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    &ldquo;{review.review_text || "No comment provided."}&rdquo;
                  </p>
                </div>

                {/* AI Reply */}
                {review.reply_text && (
                  <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" /> AI Reply
                      </span>
                      {review.reply_status === "posted" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete Reply"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {review.reply_text}
                    </p>
                  </div>
                )}

                {review.reply_status === "failed" && review.reply_error && (
                  <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1.5">
                      Error
                    </p>
                    <p className="text-sm text-red-700">{review.reply_error}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {reviews?.length === 0 && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="font-semibold text-zinc-950 mb-1.5">No reviews yet</h3>
            <p className="text-sm text-zinc-500 max-w-sm">
              Once new reviews are detected, they will appear here along with AI-generated replies.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

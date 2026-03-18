import { Skeleton } from "@/components/ui/skeleton"

function ReviewRowSkeleton() {
  return (
    <div className="glass-card p-6 border-l-4 border-white/10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export default function ReviewsLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-40 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <ReviewRowSkeleton />
        <ReviewRowSkeleton />
        <ReviewRowSkeleton />
        <ReviewRowSkeleton />
      </div>
    </div>
  )
}

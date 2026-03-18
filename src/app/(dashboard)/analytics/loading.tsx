import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pt-4">
      <div>
        <Skeleton className="h-9 w-36 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-10 w-20 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
      <div className="glass-card p-12 flex items-center justify-center">
        <Skeleton className="h-5 w-48" />
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

function LocationCardSkeleton() {
  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="w-10 h-6 rounded-full" />
      </div>
    </div>
  )
}

export default function LocationsLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-56 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <LocationCardSkeleton />
        <LocationCardSkeleton />
        <LocationCardSkeleton />
      </div>
    </div>
  )
}

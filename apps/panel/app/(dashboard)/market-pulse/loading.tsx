import { Skeleton } from "@workspace/ui/components/skeleton"

export default function MarketPulseLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
      <Skeleton className="h-96 lg:col-span-2" />
      <Skeleton className="h-96" />
      <Skeleton className="h-72 lg:col-span-2" />
      <Skeleton className="h-72" />
    </div>
  )
}

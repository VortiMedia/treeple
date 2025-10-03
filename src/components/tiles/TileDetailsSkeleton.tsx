import { Skeleton } from '@/components/ui/skeleton';

export function TileDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Badge area */}
      <Skeleton className="h-6 w-24" />

      {/* Hero image */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      {/* Description */}
      <Skeleton className="h-32 w-full" />

      {/* Button area */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}

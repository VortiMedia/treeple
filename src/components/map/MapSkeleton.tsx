import { Loader2 } from 'lucide-react';

export function MapSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <p className="text-sm text-slate-600">Loading map...</p>
      </div>
    </div>
  );
}

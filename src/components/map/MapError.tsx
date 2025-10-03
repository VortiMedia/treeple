import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapErrorProps {
  message: string;
  onRetry?: () => void;
}

export function MapError({ message, onRetry }: MapErrorProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
      <div className="max-w-md text-center space-y-4 p-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Failed to Load Map
          </h3>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

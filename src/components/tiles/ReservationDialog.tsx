'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Tile } from '@/types';
import { formatCoordinates, formatPrice } from '@/lib/format';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, DollarSign } from 'lucide-react';

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tile: Tile;
  onReserveSuccess?: () => void;
}

export function ReservationDialog({
  open,
  onOpenChange,
  tile,
  onReserveSuccess,
}: ReservationDialogProps) {
  const [giftMessage, setGiftMessage] = useState('');
  const [isReserving, setIsReserving] = useState(false);

  const handleReserve = async () => {
    setIsReserving(true);

    // Simulate API call to reserve tile
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Tile Reserved!', {
      description: `${tile.id} has been reserved. Check your email for confirmation.`,
      duration: 5000,
    });

    setIsReserving(false);
    onOpenChange(false);
    onReserveSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] backdrop-blur-xl bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Reservation</DialogTitle>
          <DialogDescription>
            Review your tile details before completing the reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tile Summary Card */}
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-sm">
                {tile.id}
              </Badge>
              <Badge className="bg-emerald-500 text-white">
                Available
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  <span>Coordinates</span>
                </div>
                <p className="text-sm font-mono text-slate-900">
                  {formatCoordinates(tile.coordinates.lat, tile.coordinates.lng)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <DollarSign className="h-3 w-3" />
                  <span>Price</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  {formatPrice(tile.price)}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 pt-2 border-t border-slate-200">
              1 km² (247 acres) conservation parcel in Yellowstone National Park
            </p>
          </div>

          {/* Optional Gift Message */}
          <div className="space-y-2">
            <Label htmlFor="gift-message" className="text-sm font-medium">
              Gift Message (Optional)
            </Label>
            <Input
              id="gift-message"
              placeholder="Add a personal message..."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              maxLength={200}
            />
            <p className="text-xs text-slate-500">
              This message will appear on your conservation certificate.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isReserving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReserve}
            disabled={isReserving}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isReserving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reserving...
              </>
            ) : (
              `Reserve for ${formatPrice(tile.price)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

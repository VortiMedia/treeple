'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tile } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { ReservationDialog } from './ReservationDialog';

interface TileActionsProps {
  tile: Tile;
  onReserve?: () => void;
}

export function TileActions({ tile, onReserve }: TileActionsProps) {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showReservationDialog, setShowReservationDialog] = useState(false);

  const handleReserveClick = () => {
    if (!user) {
      setShowAuthDialog(true);
    } else {
      setShowReservationDialog(true);
    }
  };

  if (tile.status === 'available') {
    return (
      <>
        <Separator />
        <div className="space-y-3 pt-6">
          <Button
            onClick={handleReserveClick}
            size="lg"
            className="w-full h-12 text-base font-medium bg-emerald-600 hover:bg-emerald-700"
          >
            Reserve This Square
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Learn More
          </Button>
        </div>

        {/* Auth Dialog for unauthenticated users */}
        <AuthDialog
          open={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          defaultTab="signin"
        />

        {/* Reservation Dialog for authenticated users */}
        <ReservationDialog
          open={showReservationDialog}
          onOpenChange={setShowReservationDialog}
          tile={tile}
          onReserveSuccess={onReserve}
        />
      </>
    );
  }

  if (tile.status === 'reserved') {
    return (
      <>
        <Separator />
        <div className="space-y-3 pt-6">
          <p className="text-sm text-slate-600 text-center mb-3">
            This tile is currently reserved
          </p>
          <Button
            disabled
            variant="outline"
            size="lg"
            className="w-full h-12 border-slate-300 text-slate-700 text-base font-medium"
          >
            Not Available
          </Button>
        </div>
      </>
    );
  }

  if (tile.status === 'sold') {
    return (
      <>
        <Separator />
        <div className="space-y-3 pt-6">
          <p className="text-sm text-slate-600 text-center mb-3">
            This tile has been sold
          </p>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            View Available Tiles
          </Button>
        </div>
      </>
    );
  }

  return null;
}

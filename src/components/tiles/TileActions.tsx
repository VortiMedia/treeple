'use client';

import { Button } from '@/components/ui/button';
import { Tile } from '@/types';

interface TileActionsProps {
  tile: Tile;
  onReserve?: () => void;
}

export function TileActions({ tile, onReserve }: TileActionsProps) {
  if (tile.status === 'available') {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-200">
        <Button
          onClick={onReserve}
          size="lg"
          className="w-full"
        >
          Reserve This Square
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
        >
          Learn More
        </Button>
      </div>
    );
  }

  if (tile.status === 'reserved') {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center mb-3">
          This tile is currently reserved
        </p>
        <Button
          disabled
          variant="outline"
          size="lg"
          className="w-full"
        >
          Not Available
        </Button>
      </div>
    );
  }

  if (tile.status === 'sold') {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center mb-3">
          This tile has been sold
        </p>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
        >
          View Available Tiles
        </Button>
      </div>
    );
  }

  return null;
}

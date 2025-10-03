'use client';

import { Tile } from '@/types';
import { formatCoordinates, formatPrice, formatDate } from '@/lib/format';
import { CELL_SIZE_ACRES } from '@/constants/map-config';
import { TileStatusBadge } from './TileStatusBadge';
import { TileActions } from './TileActions';

interface TileDetailsProps {
  tile: Tile;
  onReserve?: () => void;
}

export function TileDetails({ tile, onReserve }: TileDetailsProps) {
  const dateString = tile.reservedAt
    ? formatDate(tile.reservedAt)
    : tile.soldAt
    ? formatDate(tile.soldAt)
    : null;

  return (
    <div className="space-y-6">
      {/* Status Badge Row */}
      <div className="flex items-center justify-between">
        <TileStatusBadge status={tile.status} />
        {dateString && (
          <span className="text-sm text-slate-500">
            {tile.status === 'reserved' ? 'Reserved' : 'Sold'} {dateString}
          </span>
        )}
      </div>

      {/* Hero Image Placeholder */}
      <div className="h-48 rounded-xl bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center border border-slate-200">
        <p className="text-slate-400 text-sm">Tile Preview</p>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Coordinates
          </label>
          <p className="text-sm font-mono text-slate-900">
            {formatCoordinates(tile.coordinates.lat, tile.coordinates.lng)}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Tile ID
          </label>
          <p className="text-sm font-mono text-slate-900">{tile.id}</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Area
          </label>
          <p className="text-sm text-slate-900">
            1 km² ({CELL_SIZE_ACRES} acres)
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Price
          </label>
          <p className="text-base font-semibold text-slate-900">
            {formatPrice(tile.price)}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          About This Tile
        </label>
        <p className="text-sm text-slate-600 leading-relaxed">
          This 1 square kilometer parcel of Yellowstone National Park represents a
          symbolic conservation contribution. Your support helps preserve this natural
          wonder for future generations.
        </p>
      </div>

      {/* Actions */}
      <TileActions tile={tile} onReserve={onReserve} />
    </div>
  );
}

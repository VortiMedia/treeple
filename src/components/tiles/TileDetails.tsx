'use client';

import { Tile } from '@/types';
import { Landmark, getLandmarksInTile } from '@/data/landmarks';
import { formatCoordinates, formatPrice, formatDate } from '@/lib/format';
import { CELL_SIZE_ACRES } from '@/constants/map-config';
import { TileStatusBadge } from './TileStatusBadge';
import { TileActions } from './TileActions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mountain, MapPin, Sparkles } from 'lucide-react';

interface TileDetailsProps {
  tile: Tile;
  onReserve?: () => void;
  onLandmarkClick?: (landmark: Landmark) => void;
}

export function TileDetails({ tile, onReserve, onLandmarkClick }: TileDetailsProps) {
  const dateString = tile.reservedAt
    ? formatDate(tile.reservedAt)
    : tile.soldAt
    ? formatDate(tile.soldAt)
    : null;

  // Get landmarks within this tile
  const landmarksInTile = getLandmarksInTile(tile.geometry);

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
      <div className="h-48 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center border border-slate-200">
        <Mountain className="h-16 w-16 text-emerald-600 mx-auto mb-2" />
        <p className="text-sm font-medium text-emerald-700">Yellowstone National Park</p>
      </div>

      {/* Information Grid */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Coordinates
          </label>
          <p className="text-base font-mono text-slate-900">
            {formatCoordinates(tile.coordinates.lat, tile.coordinates.lng)}
          </p>
        </div>

        <Separator />

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Tile ID
          </label>
          <p className="text-base font-mono text-slate-900">{tile.id}</p>
        </div>

        <Separator />

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Area
          </label>
          <p className="text-base text-slate-900">
            1 km² ({CELL_SIZE_ACRES} acres)
          </p>
        </div>

        <Separator />

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Price
          </label>
          <p className="text-2xl font-semibold text-emerald-600">
            {formatPrice(tile.price)}
          </p>
        </div>
      </div>

      {/* Donor Information (if sold by donor) */}
      {tile.donor && tile.visibility === 'public' && (
        <Card className="backdrop-blur-sm bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Conservation Supporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Donor</label>
              <p className="text-lg font-semibold text-emerald-700 mt-1">{tile.donor}</p>
            </div>
            {tile.message && (
              <div>
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Message</label>
                <p className="text-sm text-slate-700 mt-1 italic">"{tile.message}"</p>
              </div>
            )}
            {tile.pattern && (
              <div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-300">
                  Part of "{tile.pattern}" pattern
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card className="backdrop-blur-sm bg-slate-50/50 border-slate-200/50">
        <CardHeader>
          <CardTitle className="text-lg">About This Tile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 leading-relaxed">
            This 1 square kilometer parcel of Yellowstone National Park represents a
            symbolic conservation contribution. Your support helps preserve this natural
            wonder for future generations.
          </p>
        </CardContent>
      </Card>

      {/* Landmarks in Tile */}
      {landmarksInTile.length > 0 && (
        <Card className="backdrop-blur-sm bg-emerald-50/50 border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Landmarks in This Tile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {landmarksInTile.map((landmark) => (
                <button
                  key={landmark.id}
                  onClick={() => onLandmarkClick?.(landmark)}
                  className="w-full text-left p-3 rounded-lg bg-white hover:bg-emerald-50 border border-emerald-100
                             hover:border-emerald-300 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        {landmark.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                      ${landmark.price}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 ml-6">
                    {landmark.description}
                  </p>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Click on a landmark to learn more about it
            </p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <TileActions tile={tile} onReserve={onReserve} />
    </div>
  );
}

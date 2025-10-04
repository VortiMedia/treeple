'use client';

import { Landmark } from '@/data/landmarks';
import { MapPin, DollarSign, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandmarkDetailsProps {
  landmark: Landmark;
  onReserve?: () => void;
}

/**
 * LandmarkDetails Component
 *
 * Displays detailed information about a selected landmark
 * including name, description, bio, price, and reservation action
 */
export function LandmarkDetails({ landmark, onReserve }: LandmarkDetailsProps) {
  const [lng, lat] = landmark.coordinates;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{landmark.name}</h2>
        <p className="text-sm text-slate-600">{landmark.description}</p>
      </div>

      {/* Landmark Image Placeholder */}
      <div className="relative w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-white/90" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm font-medium">{landmark.prominence.charAt(0).toUpperCase() + landmark.prominence.slice(1)} Prominence</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3" />
            <span>Coordinates</span>
          </div>
          <p className="text-sm font-mono text-slate-900">
            {lat.toFixed(4)}°N<br />
            {Math.abs(lng).toFixed(4)}°W
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <DollarSign className="h-3 w-3" />
            <span>Landmark Price</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            ${landmark.price}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-3 mb-6 flex-1">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-900">About This Landmark</h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {landmark.bio}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <Button
          onClick={onReserve}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          size="lg"
        >
          Reserve This Landmark - ${landmark.price}
        </Button>
        <p className="text-xs text-center text-slate-500">
          Support conservation by reserving this iconic Yellowstone landmark
        </p>
      </div>
    </div>
  );
}

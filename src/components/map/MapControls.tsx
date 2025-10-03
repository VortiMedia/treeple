'use client';

import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Map as MapLibreMap } from 'maplibre-gl';
import { MAP_CONFIG } from '@/constants/map-config';

interface MapControlsProps {
  map: MapLibreMap | null;
  className?: string;
}

export function MapControls({ map, className = '' }: MapControlsProps) {
  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  const handleReset = () => {
    if (map) {
      map.flyTo({
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        duration: 1000
      });
    }
  };

  return (
    <div className={`absolute top-4 right-4 flex flex-col gap-2 ${className}`}>
      <button
        onClick={handleZoomIn}
        className="w-10 h-10 rounded-lg glass hover:bg-white transition-all shadow-lg flex items-center justify-center"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-5 w-5 text-slate-700" />
      </button>
      <button
        onClick={handleZoomOut}
        className="w-10 h-10 rounded-lg glass hover:bg-white transition-all shadow-lg flex items-center justify-center"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-5 w-5 text-slate-700" />
      </button>
      <button
        onClick={handleReset}
        className="w-10 h-10 rounded-lg glass hover:bg-white transition-all shadow-lg flex items-center justify-center"
        aria-label="Reset view"
      >
        <Maximize2 className="h-5 w-5 text-slate-700" />
      </button>
    </div>
  );
}

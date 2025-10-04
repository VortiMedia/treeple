'use client';

import { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Map as MapLibreMap, Marker } from 'maplibre-gl';
import {
  Droplet,
  Waves,
  Mountain,
  Wind,
  Map as MapIcon,
  Zap,
  Sparkles
} from 'lucide-react';
import { Landmark } from '@/data/landmarks';

interface LandmarkMarkerProps {
  landmark: Landmark;
  map: MapLibreMap;
  visible?: boolean;
  onClick?: (landmark: Landmark) => void;
}

/**
 * Get icon component for landmark type
 */
function getLandmarkIcon(icon: Landmark['icon'], prominence?: 'high' | 'medium' | 'low') {
  // Larger icons for high prominence landmarks
  const iconProps = {
    className: prominence === 'high' ? 'h-5 w-5' : 'h-4 w-4',
    strokeWidth: 2.5
  };

  switch (icon) {
    case 'geyser':
      return <Wind {...iconProps} />;
    case 'spring':
      return <Sparkles {...iconProps} />;
    case 'lake':
      return <Waves {...iconProps} />;
    case 'waterfall':
      return <Droplet {...iconProps} />;
    case 'canyon':
      return <MapIcon {...iconProps} />;
    case 'mountain':
      return <Mountain {...iconProps} />;
    case 'basin':
      return <Zap {...iconProps} />;
    default:
      return <MapIcon {...iconProps} />;
  }
}

/**
 * Landmark Marker Content Component
 * Prominence-based sizing for better visibility
 */
function LandmarkMarkerContent({ landmark, onClick }: { landmark: Landmark; onClick?: () => void }) {
  // Size based on prominence
  const size = landmark.prominence === 'high' ? 40 : landmark.prominence === 'medium' ? 36 : 32;
  const borderWidth = landmark.prominence === 'high' ? 3 : 2;

  return (
    <div
      className="cursor-pointer group"
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        zIndex: 1000 // Ensure above grid tiles
      }}
    >
      {/* Glow effect for high prominence */}
      {landmark.prominence === 'high' && (
        <div
          className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md group-hover:bg-emerald-400/50 transition-all duration-200"
          style={{ transform: 'scale(1.3)' }}
        />
      )}

      {/* Tooltip - appears on hover */}
      <div
        className="absolute left-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap"
        style={{
          transform: 'translateX(-50%)',
          zIndex: 2000
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl px-3 py-1.5 text-xs font-semibold text-slate-900 border-2 border-emerald-500">
          {landmark.name}
        </div>
      </div>

      {/* Marker circle */}
      <div
        className="rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: '#10b981',
          border: `${borderWidth}px solid white`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="text-white">{getLandmarkIcon(landmark.icon, landmark.prominence)}</div>
      </div>
    </div>
  );
}

/**
 * LandmarkMarker Component
 *
 * Displays a clickable glass-morphism marker on the map with proper React rendering
 */
export function LandmarkMarker({ landmark, map, visible = true, onClick }: LandmarkMarkerProps) {
  const markerRef = useRef<Marker | null>(null);
  const rootRef = useRef<Root | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Create marker once on mount
  useEffect(() => {
    if (!map) return;

    // Create marker DOM element
    const el = document.createElement('div');
    el.className = 'landmark-marker-container';
    containerRef.current = el;

    // Create React root and render the component
    const root = createRoot(el);
    rootRef.current = root;

    root.render(
      <LandmarkMarkerContent
        landmark={landmark}
        onClick={() => onClick?.(landmark)}
      />
    );

    // Create and add marker to map with proper anchor configuration
    const marker = new Marker({
      element: el,
      anchor: 'center',
      pitchAlignment: 'map',
      rotationAlignment: 'map'
    })
      .setLngLat(landmark.coordinates)
      .addTo(map);

    markerRef.current = marker;

    // Cleanup
    return () => {
      marker.remove();
      root.unmount();
      markerRef.current = null;
      rootRef.current = null;
    };
  }, [map, landmark, onClick]);

  // Toggle visibility without recreating marker
  useEffect(() => {
    if (!markerRef.current) return;

    const element = markerRef.current.getElement();
    if (element) {
      element.style.display = visible ? 'block' : 'none';
    }
  }, [visible]);

  return null;
}

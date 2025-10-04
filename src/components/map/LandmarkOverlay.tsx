'use client';

import { useState, useEffect } from 'react';
import { Map as MapLibreMap } from 'maplibre-gl';
import { Landmark } from '@/data/landmarks';
import { enhancedYellowstoneLandmarks, getEnhancedLandmarksForZoom } from '@/data/landmarks-enhanced';
import { LandmarkMarker } from './LandmarkMarker';

interface LandmarkOverlayProps {
  map: MapLibreMap | null;
  onLandmarkClick?: (landmark: Landmark) => void;
}

/**
 * LandmarkOverlay Component
 *
 * Renders landmark markers on the map, dynamically showing/hiding based on zoom level
 * to prevent clutter at lower zoom levels
 */
export function LandmarkOverlay({ map, onLandmarkClick }: LandmarkOverlayProps) {
  const [currentZoom, setCurrentZoom] = useState<number>(9);
  const [visibleLandmarks, setVisibleLandmarks] = useState(getEnhancedLandmarksForZoom(9));

  useEffect(() => {
    if (!map) return;

    // Update visible landmarks based on zoom level
    const handleZoom = () => {
      const zoom = map.getZoom();
      setCurrentZoom(zoom);
      setVisibleLandmarks(getEnhancedLandmarksForZoom(zoom));
    };

    // Set initial zoom
    handleZoom();

    // Listen for zoom changes
    map.on('zoom', handleZoom);
    map.on('zoomend', handleZoom);

    return () => {
      map.off('zoom', handleZoom);
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  if (!map) return null;

  return (
    <>
      {enhancedYellowstoneLandmarks.map((landmark) => {
        const isVisible = visibleLandmarks.some(l => l.id === landmark.id);
        return (
          <LandmarkMarker
            key={landmark.id}
            landmark={landmark}
            map={map}
            visible={isVisible}
            onClick={onLandmarkClick}
          />
        );
      })}
    </>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import { MAP_CONFIG } from '@/constants/map-config';
import { MapSkeleton } from './MapSkeleton';
import { MapError } from './MapError';

interface MapContainerProps {
  onMapLoad?: (map: MapLibreMap) => void;
  className?: string;
  children?: React.ReactNode;
}

export function MapContainer({ onMapLoad, className = '', children }: MapContainerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Initialize map
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: MAP_CONFIG.style,
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        maxBounds: MAP_CONFIG.maxBounds as any
      });

      mapRef.current = map;

      // Set up event listeners
      map.on('load', () => {
        setIsLoading(false);
        if (onMapLoad) {
          onMapLoad(map);
        }
      });

      map.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map. Please check your MapTiler API key.');
        setIsLoading(false);
      });

      // Cleanup
      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map.');
      setIsLoading(false);
    }
  }, [onMapLoad]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Force re-mount by updating key or similar mechanism
    window.location.reload();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainerRef} className="absolute inset-0" />
      {isLoading && <MapSkeleton />}
      {error && <MapError message={error} onRetry={handleRetry} />}
      {!isLoading && !error && children}
    </div>
  );
}

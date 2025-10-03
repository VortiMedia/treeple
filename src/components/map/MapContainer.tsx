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

    // Validate style URL before initializing map
    if (!MAP_CONFIG.style || MAP_CONFIG.style === '') {
      setError('MapTiler API key is not configured. Please check your .env.local file.');
      setIsLoading(false);
      console.error(
        '❌ Cannot initialize map without a valid style URL.\n' +
        'Make sure NEXT_PUBLIC_MAPTILER_KEY is set in your .env.local file.'
      );
      return;
    }

    let loadTimeout: NodeJS.Timeout;

    try {
      // Log map initialization with truncated API key for security
      const truncatedStyle = MAP_CONFIG.style.replace(/key=([^&]+)/, 'key=***');
      console.log('Initializing map with style:', truncatedStyle);

      // Log container dimensions for debugging layout issues
      const rect = mapContainerRef.current.getBoundingClientRect();
      console.log(`Map container dimensions: ${rect.width}x${rect.height}`);

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

      // Set up load timeout (10 seconds)
      loadTimeout = setTimeout(() => {
        setError('Map is taking too long to load. Please check your internet connection and API key.');
        setIsLoading(false);
      }, 10000);

      // Set up event listeners
      map.on('load', () => {
        clearTimeout(loadTimeout);
        setIsLoading(false);
        console.log('✓ Map loaded successfully');
        if (onMapLoad) {
          onMapLoad(map);
        }
      });

      map.on('error', (e) => {
        clearTimeout(loadTimeout);
        console.error('Map error:', e);

        // Provide specific error messages based on error type
        let errorMessage = 'Failed to load map. Please check your MapTiler API key.';

        if (e.error) {
          const error = e.error;

          // Check for HTTP status errors
          if (error.status === 401 || error.status === 403) {
            errorMessage = 'Invalid MapTiler API key. Please verify your NEXT_PUBLIC_MAPTILER_KEY in .env.local';
          } else if (error.status === 404) {
            errorMessage = 'MapTiler style not found. Check your API key and style URL';
          } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            errorMessage = 'Failed to load map tiles. Check your internet connection';
          }
        }

        setError(errorMessage);
        setIsLoading(false);
      });

      // Cleanup
      return () => {
        clearTimeout(loadTimeout);
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

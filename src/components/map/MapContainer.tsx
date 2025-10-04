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

    let loadTimeout: NodeJS.Timeout;

    try {
      // Log container dimensions for debugging layout issues
      const rect = mapContainerRef.current.getBoundingClientRect();
      console.log(`Map container dimensions: ${rect.width}x${rect.height}`);

      // Use OSM fallback style (no API key or local tiles needed)
      // This works in both development and production
      const styleUrl = MAP_CONFIG.style || 'https://demotiles.maplibre.org/style.json';

      console.log(`🗺️ Initializing map with style: ${styleUrl}`);

      // Initialize map with OSM fallback style
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        maxBounds: MAP_CONFIG.maxBounds as any
      });

      mapRef.current = map;

      // Set up load timeout (10 seconds)
      loadTimeout = setTimeout(() => {
        setError('Map is taking too long to load. Please check your internet connection.');
        setIsLoading(false);
      }, 10000);

      // Set up event listeners
      map.on('load', () => {
        clearTimeout(loadTimeout);
        setIsLoading(false);
        console.log('✅ Map loaded successfully');


        // Force resize after a brief delay to ensure container has proper dimensions
        setTimeout(() => {
          map.resize();
        }, 100);

        if (onMapLoad) {
          onMapLoad(map);
        }
      });

      map.on('error', (e) => {
        clearTimeout(loadTimeout);
        console.error('❌ MapContainer: Map error event triggered:', e);

        // Log detailed error information
        if (e.error) {
          console.error('❌ MapContainer: Error object:', e.error);
          console.error('❌ MapContainer: Error status:', e.error.status);
          console.error('❌ MapContainer: Error message:', e.error.message);
          if (e.error.url) {
            console.error('❌ MapContainer: Failed URL:', e.error.url);
          }
        }

        if ('sourceId' in e && e.sourceId) {
          console.error('❌ MapContainer: Error source ID:', e.sourceId);
        }

        // Provide specific error messages based on error type
        let errorMessage = 'Failed to load map. Please check your internet connection.';

        if (e.error) {
          const error = e.error;

          // Check for HTTP status errors
          if (error.status === 401 || error.status === 403) {
            errorMessage = 'Failed to load map tiles. Authentication error.';
            console.error('❌ MapContainer: Authentication error');
          } else if (error.status === 404) {
            errorMessage = 'Map style not found. Please refresh the page.';
            console.error('❌ MapContainer: 404 error - Resource not found');
          } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            errorMessage = 'Failed to load map tiles. Check your internet connection';
            console.error('❌ MapContainer: Network error');
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
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '400px' }}>
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" style={{ minHeight: '400px' }} />
      {isLoading && <MapSkeleton />}
      {error && <MapError message={error} onRetry={handleRetry} />}
      {!isLoading && !error && children}
    </div>
  );
}

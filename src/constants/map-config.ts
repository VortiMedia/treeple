import { MapConfig } from '@/types';

// Yellowstone National Park bounding box (must match generate-grid.js)
export const YELLOWSTONE_BBOX: [number, number, number, number] = [-111.1, 44.1, -109.8, 45.1]; // [minLng, minLat, maxLng, maxLat]

/**
 * Get the MapTiler style URL with API key validation
 * NOTE: The environment variable must be prefixed with NEXT_PUBLIC_ to be available in the browser
 * @returns The MapTiler style URL or null if the API key is missing/invalid
 */
function getMapTilerStyleUrl(): string | null {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.error(
      '❌ MapTiler API key is missing!\n' +
      'Please add NEXT_PUBLIC_MAPTILER_KEY to your .env.local file.\n' +
      'Steps to fix:\n' +
      '  1. Copy .env.example to .env.local\n' +
      '  2. Get a free API key from https://cloud.maptiler.com/\n' +
      '  3. Add the key to .env.local: NEXT_PUBLIC_MAPTILER_KEY=your_key_here\n' +
      '  4. Restart the development server'
    );
    return null;
  }

  return `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${apiKey}`;
}

// MapLibre configuration for MapTiler integration
export const MAP_CONFIG: MapConfig = {
  style: getMapTilerStyleUrl() || '',
  center: [-110.5, 44.6], // Yellowstone center [lng, lat]
  zoom: 9,
  minZoom: 8,
  maxZoom: 15,
  maxBounds: [
    [YELLOWSTONE_BBOX[0], YELLOWSTONE_BBOX[1]], // Southwest corner
    [YELLOWSTONE_BBOX[2], YELLOWSTONE_BBOX[3]]  // Northeast corner
  ]
};

// Grid configuration constants
export const CELL_SIZE_KM = 1;
export const CELL_SIZE_ACRES = 247;

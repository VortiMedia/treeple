import { MapConfig } from '@/types';

// Yellowstone National Park bounding box (must match generate-grid.js)
export const YELLOWSTONE_BBOX: [number, number, number, number] = [-111.1, 44.1, -109.8, 45.1]; // [minLng, minLat, maxLng, maxLat]

// MapLibre configuration for MapTiler integration
export const MAP_CONFIG: MapConfig = {
  style: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
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

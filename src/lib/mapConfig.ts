/**
 * Advanced Map Configuration
 *
 * Custom map style configuration with terrain, hillshading, and enhanced visuals
 */

import { Map as MapLibreMap } from 'maplibre-gl';

/**
 * Add terrain and hillshading to the map for dramatic 3D effect
 *
 * @param map - MapLibre map instance
 * @param apiKey - MapTiler API key
 * @param exaggeration - Terrain exaggeration multiplier (default: 1.5)
 */
export function addTerrainToMap(
  map: MapLibreMap,
  apiKey: string,
  exaggeration: number = 1.5
): void {
  // Check if terrain source already exists
  if (map.getSource('terrarium')) {
    console.warn('Terrain source already exists, skipping');
    return;
  }

  try {
    // Add terrain RGB source for elevation data
    map.addSource('terrarium', {
      type: 'raster-dem',
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${apiKey}`,
      tileSize: 256
    });

    // Apply terrain with exaggeration for dramatic effect
    map.setTerrain({
      source: 'terrarium',
      exaggeration: exaggeration
    });

    console.log(`✓ Terrain added with ${exaggeration}x exaggeration`);
  } catch (error) {
    console.error('❌ Failed to add terrain:', error);
  }
}

/**
 * Add hillshading layer for enhanced topographic visualization
 *
 * @param map - MapLibre map instance
 * @param apiKey - MapTiler API key
 */
export function addHillshading(map: MapLibreMap, apiKey: string): void {
  // Check if hillshade source already exists
  if (map.getSource('hillshade-source')) {
    console.warn('Hillshade source already exists, skipping');
    return;
  }

  try {
    // Add hillshade source
    map.addSource('hillshade-source', {
      type: 'raster-dem',
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${apiKey}`,
      tileSize: 256
    });

    // Check if grid-fill layer exists to determine layer order
    const hasGridLayer = map.getLayer('grid-fill');

    // Add hillshade layer with subtle styling
    if (hasGridLayer) {
      // Insert before grid layer if it exists
      map.addLayer(
        {
          id: 'hillshade-layer',
          type: 'hillshade',
          source: 'hillshade-source',
          paint: {
            'hillshade-exaggeration': 0.8,
            'hillshade-shadow-color': '#1a202c',
            'hillshade-highlight-color': '#ffffff',
            'hillshade-accent-color': '#4f872b' // Subtle forest green tint
          }
        },
        'grid-fill'
      );
      console.log('✓ Hillshading added before grid layer');
    } else {
      // Add without beforeId if grid doesn't exist yet
      map.addLayer({
        id: 'hillshade-layer',
        type: 'hillshade',
        source: 'hillshade-source',
        paint: {
          'hillshade-exaggeration': 0.8,
          'hillshade-shadow-color': '#1a202c',
          'hillshade-highlight-color': '#ffffff',
          'hillshade-accent-color': '#4f872b'
        }
      });
      console.log('✓ Hillshading added (grid layer will be added on top)');
    }
  } catch (error) {
    console.error('❌ Failed to add hillshading:', error);
  }
}

/**
 * Remove terrain from the map
 *
 * @param map - MapLibre map instance
 */
export function removeTerrainFromMap(map: MapLibreMap): void {
  try {
    map.setTerrain(null);

    if (map.getSource('terrarium')) {
      map.removeSource('terrarium');
    }

    console.log('✓ Terrain removed');
  } catch (error) {
    console.error('❌ Failed to remove terrain:', error);
  }
}

/**
 * Remove hillshading from the map
 *
 * @param map - MapLibre map instance
 */
export function removeHillshading(map: MapLibreMap): void {
  try {
    if (map.getLayer('hillshade-layer')) {
      map.removeLayer('hillshade-layer');
    }

    if (map.getSource('hillshade-source')) {
      map.removeSource('hillshade-source');
    }

    console.log('✓ Hillshading removed');
  } catch (error) {
    console.error('❌ Failed to remove hillshading:', error);
  }
}

/**
 * Apply full map enhancement with terrain and hillshading
 *
 * @param map - MapLibre map instance
 * @param apiKey - MapTiler API key
 * @param terrainExaggeration - Terrain exaggeration multiplier (default: 1.5)
 */
export function enhanceMapVisuals(
  map: MapLibreMap,
  apiKey: string,
  terrainExaggeration: number = 1.5
): void {
  // Add terrain for 3D effect
  addTerrainToMap(map, apiKey, terrainExaggeration);

  // Add hillshading for depth perception
  addHillshading(map, apiKey);

  console.log('✓ Map visuals enhanced with terrain and hillshading');
}

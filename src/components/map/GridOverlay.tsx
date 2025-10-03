'use client';

import { useEffect } from 'react';
import { Map as MapLibreMap } from 'maplibre-gl';
import { GridData } from '@/types';
import { TILE_COLORS } from '@/constants/colors';

interface GridOverlayProps {
  map: MapLibreMap | null;
  gridData: GridData;
  tileStates: Map<string, any>;
  hoveredTileId: string | null;
  selectedTileId: string | null;
  onTileClick: (tileId: string) => void;
  onTileHover: (tileId: string | null) => void;
}

export function GridOverlay({
  map,
  gridData,
  tileStates,
  hoveredTileId,
  selectedTileId,
  onTileClick,
  onTileHover
}: GridOverlayProps) {
  useEffect(() => {
    if (!map || !gridData) return;

    // Wait for map to be fully loaded
    const setupLayers = () => {
      try {
        // Check if map style is loaded
        if (!map.isStyleLoaded()) {
          console.warn('⚠️  Map style not yet loaded, waiting...');
          return;
        }

        // Remove existing layers and source if they exist
        if (map.getLayer('grid-fill')) map.removeLayer('grid-fill');
        if (map.getLayer('grid-outline')) map.removeLayer('grid-outline');
        if (map.getSource('grid')) map.removeSource('grid');

        // Add grid source with tile status merged
        const enrichedData = {
          ...gridData,
          features: gridData.features.map((feature) => {
            const tileState = tileStates.get(feature.properties.id);
            return {
              ...feature,
              properties: {
                ...feature.properties,
                status: tileState?.status || feature.properties.status
              }
            };
          })
        };

        // Validate enriched data
        if (!enrichedData.features || enrichedData.features.length === 0) {
          console.error('❌ No features to add to grid overlay');
          return;
        }

        // Check for duplicate IDs
        const idSet = new Set();
        enrichedData.features.forEach((feature) => {
          if (idSet.has(feature.properties.id)) {
            console.warn(`⚠️  Duplicate tile ID detected: ${feature.properties.id}`);
          }
          idSet.add(feature.properties.id);
        });

        console.log(`Setting up grid overlay with ${enrichedData.features.length} tiles`);

        map.addSource('grid', {
          type: 'geojson',
          data: enrichedData as any
        });

        console.log('✓ Grid source added successfully');

      // Add fill layer with dynamic coloring based on status and hover
      map.addLayer({
        id: 'grid-fill',
        type: 'fill',
        source: 'grid',
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'id'], hoveredTileId || ''],
            [
              'match',
              ['get', 'status'],
              'available', TILE_COLORS.available.hoverFill,
              'reserved', TILE_COLORS.reserved.hoverFill,
              'sold', TILE_COLORS.sold.hoverFill,
              TILE_COLORS.available.fill
            ],
            [
              'match',
              ['get', 'status'],
              'available', TILE_COLORS.available.fill,
              'reserved', TILE_COLORS.reserved.fill,
              'sold', TILE_COLORS.sold.fill,
              TILE_COLORS.available.fill
            ]
          ]
        }
      });

      // Add outline layer
      map.addLayer({
        id: 'grid-outline',
        type: 'line',
        source: 'grid',
        paint: {
          'line-color': [
            'case',
            ['==', ['get', 'id'], hoveredTileId || ''],
            [
              'match',
              ['get', 'status'],
              'available', TILE_COLORS.available.hoverStroke,
              'reserved', TILE_COLORS.reserved.hoverStroke,
              'sold', TILE_COLORS.sold.hoverStroke,
              TILE_COLORS.available.stroke
            ],
            [
              'match',
              ['get', 'status'],
              'available', TILE_COLORS.available.stroke,
              'reserved', TILE_COLORS.reserved.stroke,
              'sold', TILE_COLORS.sold.stroke,
              TILE_COLORS.available.stroke
            ]
          ],
          'line-width': [
            'case',
            ['==', ['get', 'id'], hoveredTileId || ''],
            2,
            1
          ]
        }
      });

      // Add click handler
      map.on('click', 'grid-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const tileId = feature.properties?.id;
          if (tileId) {
            onTileClick(tileId);
          }
        }
      });

      // Add hover handlers
      map.on('mousemove', 'grid-fill', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const tileId = feature.properties?.id;
          if (tileId && tileId !== hoveredTileId) {
            onTileHover(tileId);
          }
        }
      });

      map.on('mouseleave', 'grid-fill', () => {
        map.getCanvas().style.cursor = '';
        onTileHover(null);
      });

        console.log('✓ Grid layers added successfully');
      } catch (error) {
        console.error('❌ Failed to add grid overlay layers:', error);
      }
    };

    if (map.isStyleLoaded()) {
      setupLayers();
    } else {
      map.once('load', setupLayers);
    }

    // Cleanup
    return () => {
      try {
        if (map.getLayer('grid-fill')) map.removeLayer('grid-fill');
        if (map.getLayer('grid-outline')) map.removeLayer('grid-outline');
        if (map.getSource('grid')) map.removeSource('grid');
      } catch (error) {
        // Ignore cleanup errors (map might be destroyed already)
      }
    };
  }, [map, gridData, tileStates, onTileClick, onTileHover]);

  // Update paint properties when hover state changes
  useEffect(() => {
    if (!map || !map.getLayer('grid-fill')) return;

    map.setPaintProperty('grid-fill', 'fill-color', [
      'case',
      ['==', ['get', 'id'], hoveredTileId || ''],
      [
        'match',
        ['get', 'status'],
        'available', TILE_COLORS.available.hoverFill,
        'reserved', TILE_COLORS.reserved.hoverFill,
        'sold', TILE_COLORS.sold.hoverFill,
        TILE_COLORS.available.fill
      ],
      [
        'match',
        ['get', 'status'],
        'available', TILE_COLORS.available.fill,
        'reserved', TILE_COLORS.reserved.fill,
        'sold', TILE_COLORS.sold.fill,
        TILE_COLORS.available.fill
      ]
    ]);

    map.setPaintProperty('grid-outline', 'line-color', [
      'case',
      ['==', ['get', 'id'], hoveredTileId || ''],
      [
        'match',
        ['get', 'status'],
        'available', TILE_COLORS.available.hoverStroke,
        'reserved', TILE_COLORS.reserved.hoverStroke,
        'sold', TILE_COLORS.sold.hoverStroke,
        TILE_COLORS.available.stroke
      ],
      [
        'match',
        ['get', 'status'],
        'available', TILE_COLORS.available.stroke,
        'reserved', TILE_COLORS.reserved.stroke,
        'sold', TILE_COLORS.sold.stroke,
        TILE_COLORS.available.stroke
      ]
    ]);

    map.setPaintProperty('grid-outline', 'line-width', [
      'case',
      ['==', ['get', 'id'], hoveredTileId || ''],
      2,
      1
    ]);
  }, [map, hoveredTileId]);

  return null; // This component doesn't render anything directly
}

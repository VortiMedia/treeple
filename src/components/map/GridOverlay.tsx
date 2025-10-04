'use client';

import { useEffect, useCallback } from 'react';
import { Map as MapLibreMap, MapLayerMouseEvent } from 'maplibre-gl';
import { GridData } from '@/types';
import { generateFillPaintProperties, generateLinePaintProperties } from '@/lib/tile-styling';

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
  // Memoize click handler
  const handleTileClick = useCallback((e: MapLayerMouseEvent) => {
    if (!e.features?.[0]) return;
    const tileId = e.features[0].properties?.id;
    if (tileId) onTileClick(tileId);
  }, [onTileClick]);

  // Memoize hover handler
  const handleTileHover = useCallback((e: MapLayerMouseEvent) => {
    if (!e.features?.[0]) return;
    const tileId = e.features[0].properties?.id;
    if (tileId) onTileHover(tileId);
  }, [onTileHover]);

  // Memoize leave handler
  const handleTileLeave = useCallback(() => {
    onTileHover(null);
  }, [onTileHover]);

  // Memoize cursor handlers
  const handleMouseEnter = useCallback(() => {
    if (map) map.getCanvas().style.cursor = 'pointer';
  }, [map]);

  const handleMouseLeave = useCallback(() => {
    if (map) map.getCanvas().style.cursor = '';
  }, [map]);

  // Setup layers and handlers ONCE
  useEffect(() => {
    if (!map || !gridData) return;

    const setupLayers = () => {
      // Check if style is loaded
      if (!map.isStyleLoaded()) {
        map.once('load', setupLayers);
        return;
      }

      try {
        console.log('🔧 GridOverlay: Setting up layers...');

        // Remove existing if present
        if (map.getLayer('grid-fill')) {
          console.log('🔧 GridOverlay: Removing existing grid-fill layer');
          map.removeLayer('grid-fill');
        }
        if (map.getLayer('grid-outline')) {
          console.log('🔧 GridOverlay: Removing existing grid-outline layer');
          map.removeLayer('grid-outline');
        }
        if (map.getSource('grid')) {
          console.log('🔧 GridOverlay: Removing existing grid source');
          map.removeSource('grid');
        }

        // Add source - features will have IDs for feature-state
        // Include donor metadata in properties for data-driven styling
        const enrichedData = {
          ...gridData,
          features: gridData.features.map((feature) => {
            const tileState = tileStates.get(feature.properties.id);
            return {
              ...feature,
              properties: {
                ...feature.properties,
                status: tileState?.status || feature.properties.status,
                // Include donor metadata for visual styling
                donor: tileState?.donor,
                pattern: tileState?.pattern,
                visibility: tileState?.visibility
              },
              id: feature.properties.id // Set feature ID for feature-state
            };
          })
        };

        console.log(`🔧 GridOverlay: Adding grid source with ${enrichedData.features.length} features`);
        map.addSource('grid', {
          type: 'geojson',
          data: enrichedData as any,
          promoteId: 'id' // Use the id property for feature-state
        });

        // Add fill layer with data-driven donor styling
        map.addLayer({
          id: 'grid-fill',
          type: 'fill',
          source: 'grid',
          paint: generateFillPaintProperties()
        });

        // Add outline layer with data-driven donor styling
        map.addLayer({
          id: 'grid-outline',
          type: 'line',
          source: 'grid',
          paint: generateLinePaintProperties()
        });

        // Add event handlers - ONCE
        console.log('🔧 GridOverlay: Adding event handlers');
        map.on('click', 'grid-fill', handleTileClick);
        map.on('mousemove', 'grid-fill', handleTileHover);
        map.on('mouseleave', 'grid-fill', handleTileLeave);

        // Change cursor on hover
        map.on('mouseenter', 'grid-fill', handleMouseEnter);
        map.on('mouseleave', 'grid-fill', handleMouseLeave);

        console.log(`✅ Grid overlay setup complete with ${enrichedData.features.length} tiles`);
      } catch (error) {
        console.error('❌ GridOverlay: Failed to setup grid overlay:', error);
        if (error instanceof Error) {
          console.error('❌ GridOverlay: Error message:', error.message);
          console.error('❌ GridOverlay: Error stack:', error.stack);
        }
      }
    };

    setupLayers();

    // Cleanup function
    return () => {
      if (!map) return;

      try {
        console.log('🧹 GridOverlay: Cleaning up event handlers and layers');
        // Remove ALL event handlers
        map.off('click', 'grid-fill', handleTileClick);
        map.off('mousemove', 'grid-fill', handleTileHover);
        map.off('mouseleave', 'grid-fill', handleTileLeave);
        map.off('mouseenter', 'grid-fill', handleMouseEnter);
        map.off('mouseleave', 'grid-fill', handleMouseLeave);

        // Remove layers and source
        if (map.getLayer('grid-fill')) map.removeLayer('grid-fill');
        if (map.getLayer('grid-outline')) map.removeLayer('grid-outline');
        if (map.getSource('grid')) map.removeSource('grid');
        console.log('✅ GridOverlay: Cleanup complete');
      } catch (error) {
        console.error('⚠️ GridOverlay: Error during cleanup:', error);
      }
    };
  }, [map, gridData, handleTileClick, handleTileHover, handleTileLeave, handleMouseEnter, handleMouseLeave]);

  // Update tile statuses when they change
  useEffect(() => {
    if (!map || !map.getSource('grid') || !gridData) return;

    try {
      console.log('🔄 GridOverlay: Updating tile statuses and donor metadata');
      // Update the source data with new statuses and donor metadata
      const enrichedData = {
        ...gridData,
        features: gridData.features.map((feature) => {
          const tileState = tileStates.get(feature.properties.id);
          return {
            ...feature,
            properties: {
              ...feature.properties,
              status: tileState?.status || feature.properties.status,
              // Include donor metadata for visual styling
              donor: tileState?.donor,
              pattern: tileState?.pattern,
              visibility: tileState?.visibility
            },
            id: feature.properties.id
          };
        })
      };

      const source = map.getSource('grid') as any;
      if (source && source.setData) {
        source.setData(enrichedData);
        console.log('✅ GridOverlay: Tile statuses updated');
      } else {
        console.error('❌ GridOverlay: Grid source not found or setData not available');
      }
    } catch (error) {
      console.error('❌ GridOverlay: Error updating tile statuses:', error);
      if (error instanceof Error) {
        console.error('❌ GridOverlay: Error message:', error.message);
      }
    }
  }, [map, gridData, tileStates]);

  // Update hover state using feature-state (efficient, no re-render)
  useEffect(() => {
    if (!map || !map.getLayer('grid-fill')) return;

    let previousHoveredId: string | null = null;

    // Clear previous hover state
    if (previousHoveredId && previousHoveredId !== hoveredTileId) {
      try {
        map.setFeatureState(
          { source: 'grid', id: previousHoveredId },
          { hover: false }
        );
      } catch (error) {
        // Ignore errors
      }
    }

    // Set new hover state
    if (hoveredTileId) {
      try {
        map.setFeatureState(
          { source: 'grid', id: hoveredTileId },
          { hover: true }
        );
        previousHoveredId = hoveredTileId;
      } catch (error) {
        // Ignore errors
      }
    }

    return () => {
      if (hoveredTileId) {
        try {
          map.setFeatureState(
            { source: 'grid', id: hoveredTileId },
            { hover: false }
          );
        } catch (error) {
          // Ignore errors
        }
      }
    };
  }, [map, hoveredTileId]);

  return null; // This component doesn't render anything directly
}

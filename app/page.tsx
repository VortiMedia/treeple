'use client';

import { useState, useEffect, useCallback } from 'react';
import { Map as MapLibreMap } from 'maplibre-gl';
import { Header } from '@/components/layout/Header';
import { SidePanel } from '@/components/layout/SidePanel';
import { MapContainer } from '@/components/map/MapContainer';
import { GridOverlay } from '@/components/map/GridOverlay';
import { MapControls } from '@/components/map/MapControls';
import { MapLegend } from '@/components/map/MapLegend';
import { TileDetails } from '@/components/tiles/TileDetails';
import { TileDetailsSkeleton } from '@/components/tiles/TileDetailsSkeleton';
import { loadGridData, loadSeedData, mergeTileData, getTileById } from '@/lib/tile-data';
import { GridData, Tile } from '@/types';
import { toast } from 'sonner';

export default function Home() {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [gridData, setGridData] = useState<GridData | null>(null);
  const [tileStates, setTileStates] = useState<Map<string, Tile>>(new Map());
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log('Loading Treeple data...');

        const [grid, seed] = await Promise.all([loadGridData(), loadSeedData()]);
        const merged = mergeTileData(grid, seed);

        // Validate merged data
        if (merged.size === 0) {
          setError('No tiles loaded. Please regenerate grid data by running: npm run generate-grid');
          setLoading(false);
          return;
        }

        if (merged.size === 1) {
          setError('Grid data is corrupted (only 1 unique tile). Please run: npm run generate-grid');
          setLoading(false);
          return;
        }

        console.log(`✓ Data loaded successfully: ${grid.features.length} grid tiles, ${merged.size} in tile map`);

        setGridData(grid);
        setTileStates(merged);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load data:', err);

        // Provide specific error messages based on error type
        let errorMessage = 'Failed to load grid data';

        if (err instanceof Error) {
          if (err.message.includes('404')) {
            errorMessage = 'Grid data file not found. Please run: npm run generate-grid';
          } else if (err.message.includes('duplicate')) {
            errorMessage = 'Grid data is corrupted. Please run: npm run generate-grid';
          } else if (err.message.includes('network') || err.message.includes('fetch')) {
            errorMessage = 'Network error loading data. Please check your connection.';
          } else if (err.message) {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleMapLoad = useCallback((loadedMap: MapLibreMap) => {
    setMap(loadedMap);
  }, []);

  const handleTileClick = (tileId: string) => {
    const tile = getTileById(tileStates, tileId);
    if (tile) {
      setSelectedTile(tile);
      setIsPanelOpen(true);
    }
  };

  const handleTileHover = (tileId: string | null) => {
    setHoveredTileId(tileId);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedTile(null);
  };

  const handleReserve = () => {
    // MVP: Just show success toast (no real persistence)
    toast.success('Tile reserved!', {
      description: 'Your reservation has been confirmed. (Demo only)'
    });
  };

  if (error) {
    const isGridDataError = error.includes('grid data') || error.includes('corrupted');

    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Failed to Load</h1>
            <p className="text-slate-600">{error}</p>
          </div>

          {isGridDataError && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
              <p className="text-sm font-semibold text-slate-900 mb-2">To fix this issue:</p>
              <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                <li>Open your terminal in the project directory</li>
                <li>Run: <code className="px-1 py-0.5 bg-slate-200 rounded text-slate-900">npm run generate-grid</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => console.log('Check browser console for details')}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              View Console
            </button>
          </div>

          <p className="text-sm text-slate-500">
            Check the browser console (F12) for detailed error information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Map Container */}
      <main className="flex-1 relative overflow-hidden">
        <MapContainer onMapLoad={handleMapLoad}>
          {map && gridData && (
            <>
              <GridOverlay
                map={map}
                gridData={gridData}
                tileStates={tileStates}
                hoveredTileId={hoveredTileId}
                selectedTileId={selectedTile?.id || null}
                onTileClick={handleTileClick}
                onTileHover={handleTileHover}
              />
              <MapControls map={map} />
              <MapLegend />
            </>
          )}
        </MapContainer>
      </main>

      {/* Side Panel / Bottom Sheet */}
      <SidePanel isOpen={isPanelOpen} onClose={handlePanelClose}>
        {selectedTile ? (
          <TileDetails tile={selectedTile} onReserve={handleReserve} />
        ) : (
          <TileDetailsSkeleton />
        )}
      </SidePanel>
    </div>
  );
}

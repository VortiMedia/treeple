'use client';

import { useState, useEffect } from 'react';
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
        const [grid, seed] = await Promise.all([loadGridData(), loadSeedData()]);
        const merged = mergeTileData(grid, seed);

        setGridData(grid);
        setTileStates(merged);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load grid data');
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleMapLoad = (loadedMap: MapLibreMap) => {
    setMap(loadedMap);
  };

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Failed to Load</h1>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Map Container */}
      <main className="flex-1 relative mt-16">
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

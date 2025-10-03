import { Tile, GridData, SeedData } from '@/types';
import { DEFAULT_TILE_PRICE } from '@/constants/colors';

/**
 * Load the Yellowstone grid GeoJSON data
 */
export async function loadGridData(): Promise<GridData> {
  try {
    const response = await fetch('/data/yellowstone-grid.json');
    if (!response.ok) {
      throw new Error(`Failed to load grid data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading grid data:', error);
    throw error;
  }
}

/**
 * Load the seed tile status data
 */
export async function loadSeedData(): Promise<SeedData> {
  try {
    const response = await fetch('/data/seed-tiles.json');
    if (!response.ok) {
      throw new Error(`Failed to load seed data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading seed data:', error);
    throw error;
  }
}

/**
 * Merge grid data with seed status overrides
 */
export function mergeTileData(gridData: GridData, seedData: SeedData): Map<string, Tile> {
  const tileMap = new Map<string, Tile>();

  gridData.features.forEach((feature) => {
    const tileId = feature.properties.id;
    const seedStatus = seedData[tileId];

    const tile: Tile = {
      id: tileId,
      coordinates: feature.properties.coordinates,
      status: seedStatus?.status || feature.properties.status,
      geometry: feature.geometry,
      price: DEFAULT_TILE_PRICE,
      ...(seedStatus?.reservedAt && { reservedAt: seedStatus.reservedAt }),
      ...(seedStatus?.soldAt && { soldAt: seedStatus.soldAt })
    };

    tileMap.set(tileId, tile);
  });

  return tileMap;
}

/**
 * Get a specific tile by ID
 */
export function getTileById(tileMap: Map<string, Tile>, tileId: string): Tile | undefined {
  return tileMap.get(tileId);
}

/**
 * Calculate statistics for tile statuses
 */
export function getTileStats(tileMap: Map<string, Tile>) {
  const stats = {
    total: tileMap.size,
    available: 0,
    reserved: 0,
    sold: 0
  };

  tileMap.forEach((tile) => {
    stats[tile.status]++;
  });

  return stats;
}

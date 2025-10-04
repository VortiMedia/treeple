import { TileStatus } from '@/types';

interface TileColorConfig {
  fill: string;
  stroke: string;
  hoverFill: string;
  hoverStroke: string;
}

// Tile status colors for MapLibre layers (RGBA format)
// Reduced opacity to show the beautiful topographic map underneath
export const TILE_COLORS: Record<TileStatus, TileColorConfig> = {
  available: {
    fill: 'rgba(16, 185, 129, 0.15)',      // emerald-500 at 15% opacity
    stroke: 'rgba(16, 185, 129, 0.6)',     // emerald-500 at 60% opacity
    hoverFill: 'rgba(16, 185, 129, 0.35)', // emerald-500 at 35% opacity
    hoverStroke: 'rgba(16, 185, 129, 1)'  // emerald-500 at 100% opacity
  },
  reserved: {
    fill: 'rgba(251, 191, 36, 0.15)',      // amber-400 at 15% opacity
    stroke: 'rgba(251, 191, 36, 0.6)',     // amber-400 at 60% opacity
    hoverFill: 'rgba(251, 191, 36, 0.35)', // amber-400 at 35% opacity
    hoverStroke: 'rgba(251, 191, 36, 1)'  // amber-400 at 100% opacity
  },
  sold: {
    fill: 'rgba(100, 116, 139, 0.15)',     // slate-500 at 15% opacity
    stroke: 'rgba(100, 116, 139, 0.6)',    // slate-500 at 60% opacity
    hoverFill: 'rgba(100, 116, 139, 0.35)', // slate-500 at 35% opacity
    hoverStroke: 'rgba(100, 116, 139, 1)' // slate-500 at 100% opacity
  }
};

// Default tile price in cents
export const DEFAULT_TILE_PRICE = 5000; // $50.00

import { TileStatus } from '@/types';

interface TileColorConfig {
  fill: string;
  stroke: string;
  hoverFill: string;
  hoverStroke: string;
}

// Tile status colors for MapLibre layers (RGBA format)
export const TILE_COLORS: Record<TileStatus, TileColorConfig> = {
  available: {
    fill: 'rgba(16, 185, 129, 0.2)',      // emerald-500 at 20% opacity
    stroke: 'rgba(16, 185, 129, 0.6)',    // emerald-500 at 60% opacity
    hoverFill: 'rgba(16, 185, 129, 0.4)', // emerald-500 at 40% opacity
    hoverStroke: 'rgba(16, 185, 129, 0.9)' // emerald-500 at 90% opacity
  },
  reserved: {
    fill: 'rgba(251, 191, 36, 0.2)',      // amber-400 at 20% opacity
    stroke: 'rgba(251, 191, 36, 0.6)',    // amber-400 at 60% opacity
    hoverFill: 'rgba(251, 191, 36, 0.4)', // amber-400 at 40% opacity
    hoverStroke: 'rgba(251, 191, 36, 0.9)' // amber-400 at 90% opacity
  },
  sold: {
    fill: 'rgba(100, 116, 139, 0.3)',     // slate-500 at 30% opacity
    stroke: 'rgba(100, 116, 139, 0.7)',   // slate-500 at 70% opacity
    hoverFill: 'rgba(100, 116, 139, 0.45)', // slate-500 at 45% opacity
    hoverStroke: 'rgba(100, 116, 139, 0.9)' // slate-500 at 90% opacity
  }
};

// Default tile price in cents
export const DEFAULT_TILE_PRICE = 5000; // $50.00

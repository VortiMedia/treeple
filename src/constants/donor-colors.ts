/**
 * Donor Color Scheme
 *
 * Distinct colors for each major donor to make their patterns visually recognizable
 * on the map. Colors are chosen to be distinguishable and tell a visual story.
 */

export interface DonorColorConfig {
  name: string;
  fill: string;           // Base fill color
  fillOpacity: number;    // Higher than regular tiles for prominence
  stroke: string;         // Border color
  strokeWidth: number;    // Border width
  hoverFill: string;      // Color when hovering
  hoverOpacity: number;   // Opacity when hovering
  pattern: string;        // Pattern identifier
}

export const DONOR_COLORS: Record<string, DonorColorConfig> = {
  'Elon Musk': {
    name: 'Elon Musk',
    pattern: 'bear',
    fill: '#DC2626',        // Deep red/crimson (Tailwind red-600)
    fillOpacity: 0.6,
    stroke: '#991B1B',      // Darker red border (Tailwind red-800)
    strokeWidth: 2,
    hoverFill: '#EF4444',   // Brighter red on hover (Tailwind red-500)
    hoverOpacity: 0.8
  },
  'Patagonia Foundation': {
    name: 'Patagonia Foundation',
    pattern: 'bison',
    fill: '#EA580C',        // Warm orange (Tailwind orange-600)
    fillOpacity: 0.6,
    stroke: '#C2410C',      // Darker orange border (Tailwind orange-700)
    strokeWidth: 2,
    hoverFill: '#F97316',   // Brighter orange on hover (Tailwind orange-500)
    hoverOpacity: 0.8
  },
  'Marc Benioff': {
    name: 'Marc Benioff',
    pattern: 'tree',
    fill: '#15803D',        // Dark forest green (Tailwind green-700)
    fillOpacity: 0.6,
    stroke: '#166534',      // Even darker green border (Tailwind green-800)
    strokeWidth: 2,
    hoverFill: '#22C55E',   // Brighter green on hover (Tailwind green-500)
    hoverOpacity: 0.8
  },
  'Bill & Melinda Gates Foundation': {
    name: 'Bill & Melinda Gates Foundation',
    pattern: 'cluster_old_faithful',
    fill: '#2563EB',        // Royal blue (Tailwind blue-600)
    fillOpacity: 0.6,
    stroke: '#1E40AF',      // Darker blue border (Tailwind blue-800)
    strokeWidth: 2,
    hoverFill: '#3B82F6',   // Brighter blue on hover (Tailwind blue-500)
    hoverOpacity: 0.8
  },
  'Leonardo DiCaprio Foundation': {
    name: 'Leonardo DiCaprio Foundation',
    pattern: 'cluster_grand_canyon',
    fill: '#0D9488',        // Teal (Tailwind teal-600)
    fillOpacity: 0.6,
    stroke: '#115E59',      // Darker teal border (Tailwind teal-800)
    strokeWidth: 2,
    hoverFill: '#14B8A6',   // Brighter teal on hover (Tailwind teal-500)
    hoverOpacity: 0.8
  },
  'National Geographic Society': {
    name: 'National Geographic Society',
    pattern: 'cluster_yellowstone_lake',
    fill: '#CA8A04',        // Golden yellow (Tailwind yellow-600)
    fillOpacity: 0.6,
    stroke: '#A16207',      // Darker gold border (Tailwind yellow-700)
    strokeWidth: 2,
    hoverFill: '#EAB308',   // Brighter gold on hover (Tailwind yellow-500)
    hoverOpacity: 0.8
  },
  'Salesforce Ohana Foundation': {
    name: 'Salesforce Ohana Foundation',
    pattern: 'cluster_random',
    fill: '#9333EA',        // Purple (Tailwind purple-600)
    fillOpacity: 0.6,
    stroke: '#7E22CE',      // Darker purple border (Tailwind purple-700)
    strokeWidth: 2,
    hoverFill: '#A855F7',   // Brighter purple on hover (Tailwind purple-500)
    hoverOpacity: 0.8
  },
  'Anonymous': {
    name: 'Anonymous',
    pattern: 'cluster_small',
    fill: '#65A30D',        // Olive green (Tailwind lime-600)
    fillOpacity: 0.6,
    stroke: '#4D7C0F',      // Darker olive border (Tailwind lime-700)
    strokeWidth: 2,
    hoverFill: '#84CC16',   // Brighter olive on hover (Tailwind lime-500)
    hoverOpacity: 0.8
  }
};

/**
 * Colors for non-donor tiles (subdued to let donor patterns stand out)
 */
export const NON_DONOR_COLORS = {
  available: {
    fill: '#10b981',        // Emerald-500
    fillOpacity: 0.15,      // Very subtle
    stroke: '#059669',      // Emerald-600
    strokeWidth: 1,
    hoverFill: '#34d399',   // Emerald-400
    hoverOpacity: 0.3
  },
  reserved: {
    fill: '#f59e0b',        // Amber-500
    fillOpacity: 0.25,      // Subdued (was 0.4)
    stroke: '#d97706',      // Amber-600
    strokeWidth: 1,
    hoverFill: '#fbbf24',   // Amber-400
    hoverOpacity: 0.4
  },
  sold: {
    fill: '#64748b',        // Slate-500
    fillOpacity: 0.3,       // Muted
    stroke: '#475569',      // Slate-600
    strokeWidth: 1,
    hoverFill: '#94a3b8',   // Slate-400
    hoverOpacity: 0.5
  }
};

/**
 * Get color configuration for a tile based on donor attribution
 */
export function getTileColorConfig(donor?: string, status?: string): DonorColorConfig | typeof NON_DONOR_COLORS.available {
  // If tile has donor attribution, use donor colors (bold and prominent)
  if (donor && DONOR_COLORS[donor]) {
    return DONOR_COLORS[donor];
  }

  // Otherwise use subdued colors based on status
  if (status === 'reserved') {
    return NON_DONOR_COLORS.reserved as any;
  } else if (status === 'sold') {
    return NON_DONOR_COLORS.sold as any;
  } else {
    return NON_DONOR_COLORS.available as any;
  }
}

/**
 * Get list of all donor names for pattern matching
 */
export function getAllDonorNames(): string[] {
  return Object.keys(DONOR_COLORS);
}

/**
 * Get color by pattern name (alternative lookup method)
 */
export function getColorByPattern(pattern: string): DonorColorConfig | null {
  const donor = Object.values(DONOR_COLORS).find(d => d.pattern === pattern);
  return donor || null;
}

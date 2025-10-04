/**
 * Tile Styling Helpers
 *
 * Generates MapLibre GL JS paint expressions for data-driven tile styling
 * based on donor attribution, status, and hover state.
 */

import { DONOR_COLORS, NON_DONOR_COLORS, getAllDonorNames } from '@/constants/donor-colors';

/**
 * Generate fill-color expression for tiles
 *
 * Priority hierarchy:
 * 1. If tile has donor → Use bold donor color
 * 2. If tile is reserved (no donor) → Use subdued amber
 * 3. If tile is sold (no donor) → Use muted gray
 * 4. Otherwise → Use subtle green (available)
 *
 * @param isHover - Whether this is for hover state
 */
export function generateFillColorExpression(isHover: boolean = false): any {
  const donorNames = getAllDonorNames();

  // Build match expression for donor colors
  const donorMatchPairs: any[] = [];
  donorNames.forEach(donorName => {
    const config = DONOR_COLORS[donorName];
    donorMatchPairs.push(donorName);
    donorMatchPairs.push(isHover ? config.hoverFill : config.fill);
  });

  return [
    'case',
    // Check if tile has donor attribution
    ['has', 'donor'],
    [
      'match',
      ['get', 'donor'],
      ...donorMatchPairs,
      // Fallback if donor not recognized
      isHover ? NON_DONOR_COLORS.sold.hoverFill : NON_DONOR_COLORS.sold.fill
    ],
    // No donor - use status-based colors (subdued)
    [
      'match',
      ['get', 'status'],
      'available', isHover ? NON_DONOR_COLORS.available.hoverFill : NON_DONOR_COLORS.available.fill,
      'reserved', isHover ? NON_DONOR_COLORS.reserved.hoverFill : NON_DONOR_COLORS.reserved.fill,
      'sold', isHover ? NON_DONOR_COLORS.sold.hoverFill : NON_DONOR_COLORS.sold.fill,
      NON_DONOR_COLORS.available.fill
    ]
  ];
}

/**
 * Generate fill-opacity expression for tiles
 *
 * Donor tiles have higher opacity to stand out
 */
export function generateFillOpacityExpression(isHover: boolean = false): any {
  const donorNames = getAllDonorNames();

  // Build match expression for donor opacity
  const donorMatchPairs: any[] = [];
  donorNames.forEach(donorName => {
    const config = DONOR_COLORS[donorName];
    donorMatchPairs.push(donorName);
    donorMatchPairs.push(isHover ? config.hoverOpacity : config.fillOpacity);
  });

  return [
    'case',
    // Check if tile has donor attribution
    ['has', 'donor'],
    [
      'match',
      ['get', 'donor'],
      ...donorMatchPairs,
      // Fallback opacity
      0.5
    ],
    // No donor - use status-based opacity (lower)
    [
      'match',
      ['get', 'status'],
      'available', isHover ? NON_DONOR_COLORS.available.hoverOpacity : NON_DONOR_COLORS.available.fillOpacity,
      'reserved', isHover ? NON_DONOR_COLORS.reserved.hoverOpacity : NON_DONOR_COLORS.reserved.fillOpacity,
      'sold', isHover ? NON_DONOR_COLORS.sold.hoverOpacity : NON_DONOR_COLORS.sold.fillOpacity,
      NON_DONOR_COLORS.available.fillOpacity
    ]
  ];
}

/**
 * Generate line-color expression for tile borders
 */
export function generateStrokeColorExpression(isHover: boolean = false): any {
  const donorNames = getAllDonorNames();

  // Build match expression for donor stroke colors
  const donorMatchPairs: any[] = [];
  donorNames.forEach(donorName => {
    const config = DONOR_COLORS[donorName];
    donorMatchPairs.push(donorName);
    // For hover, use the hover fill color; otherwise use stroke color
    donorMatchPairs.push(isHover ? config.hoverFill : config.stroke);
  });

  return [
    'case',
    // Check if tile has donor attribution
    ['has', 'donor'],
    [
      'match',
      ['get', 'donor'],
      ...donorMatchPairs,
      // Fallback stroke
      NON_DONOR_COLORS.sold.stroke
    ],
    // No donor - use status-based strokes (subdued)
    [
      'match',
      ['get', 'status'],
      'available', isHover ? NON_DONOR_COLORS.available.hoverFill : NON_DONOR_COLORS.available.stroke,
      'reserved', isHover ? NON_DONOR_COLORS.reserved.hoverFill : NON_DONOR_COLORS.reserved.stroke,
      'sold', isHover ? NON_DONOR_COLORS.sold.hoverFill : NON_DONOR_COLORS.sold.stroke,
      NON_DONOR_COLORS.available.stroke
    ]
  ];
}

/**
 * Generate line-width expression for tile borders
 *
 * Donor tiles have thicker borders to make patterns more obvious
 */
export function generateStrokeWidthExpression(isHover: boolean = false): any {
  return [
    'case',
    // Donor tiles get thicker borders
    ['has', 'donor'],
    isHover ? 3 : 2,
    // Non-donor tiles get thinner borders
    isHover ? 2 : 1
  ];
}

/**
 * Generate complete paint properties for fill layer
 */
export function generateFillPaintProperties(): any {
  return {
    'fill-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      generateFillColorExpression(true),
      generateFillColorExpression(false)
    ],
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      generateFillOpacityExpression(true),
      generateFillOpacityExpression(false)
    ]
  };
}

/**
 * Generate complete paint properties for line layer
 */
export function generateLinePaintProperties(): any {
  return {
    'line-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      generateStrokeColorExpression(true),
      generateStrokeColorExpression(false)
    ],
    'line-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      generateStrokeWidthExpression(true),
      generateStrokeWidthExpression(false)
    ]
  };
}

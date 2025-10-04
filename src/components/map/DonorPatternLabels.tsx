'use client';

import { useEffect, useRef } from 'react';
import { Map as MapLibreMap, Marker } from 'maplibre-gl';
import { DONOR_COLORS } from '@/constants/donor-colors';

interface DonorPattern {
  donor: string;
  pattern: string;
  center: [number, number]; // [lng, lat]
  tileCount: number;
}

interface DonorPatternLabelsProps {
  map: MapLibreMap | null;
}

/**
 * Displays floating labels over major donor pattern clusters
 * to make them more recognizable and tell the conservation story
 */
export function DonorPatternLabels({ map }: DonorPatternLabelsProps) {
  const markersRef = useRef<Marker[]>([]);

  // Major donor patterns with approximate center coordinates
  const donorPatterns: DonorPattern[] = [
    {
      donor: 'Elon Musk',
      pattern: 'Bear Territory',
      center: [-110.85, 44.62], // Bear cluster center
      tileCount: 20
    },
    {
      donor: 'Patagonia Foundation',
      pattern: 'Bison Corridor',
      center: [-110.45, 44.74], // Bison cluster center
      tileCount: 34
    },
    {
      donor: 'Marc Benioff',
      pattern: 'Forest Reserve',
      center: [-110.50, 44.58], // Tree cluster center
      tileCount: 26
    },
    {
      donor: 'Bill & Melinda Gates Foundation',
      pattern: 'Old Faithful Area',
      center: [-110.85, 44.46], // Near Old Faithful
      tileCount: 15
    },
    {
      donor: 'Leonardo DiCaprio Foundation',
      pattern: 'Grand Canyon Zone',
      center: [-110.26, 44.84], // Near Grand Canyon
      tileCount: 11
    }
  ];

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create a label marker for each donor pattern
    donorPatterns.forEach(pattern => {
      const colorConfig = DONOR_COLORS[pattern.donor];
      if (!colorConfig) return;

      // Create label element
      const el = document.createElement('div');
      el.className = 'donor-pattern-label';
      el.innerHTML = `
        <div style="
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
          backdrop-filter: blur(12px);
          border: 2px solid ${colorConfig.stroke};
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          font-family: system-ui, -apple-system, sans-serif;
          white-space: nowrap;
          cursor: default;
          user-select: none;
          transition: all 0.2s ease;
        " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="
              width: 12px;
              height: 12px;
              border-radius: 3px;
              background-color: ${colorConfig.fill};
              border: 1.5px solid ${colorConfig.stroke};
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "></div>
            <div>
              <div style="
                font-size: 13px;
                font-weight: 700;
                color: #0f172a;
                line-height: 1.2;
                margin-bottom: 2px;
              ">${pattern.pattern}</div>
              <div style="
                font-size: 10px;
                font-weight: 500;
                color: #64748b;
                line-height: 1;
              ">${pattern.donor} • ${pattern.tileCount} tiles</div>
            </div>
          </div>
        </div>
      `;

      // Create marker
      const marker = new Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat(pattern.center)
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [map]);

  return null;
}

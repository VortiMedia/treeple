'use client';

import { DONOR_COLORS } from '@/constants/donor-colors';
import { Sparkles } from 'lucide-react';

export function MapLegend() {
  // Top 5 donors by tile count (from seed data analysis)
  const topDonors = [
    { name: 'Patagonia Foundation', count: 34, pattern: 'bison' },
    { name: 'Marc Benioff', count: 26, pattern: 'tree' },
    { name: 'Elon Musk', count: 20, pattern: 'bear' },
    { name: 'Bill & Melinda Gates Foundation', count: 15, pattern: 'cluster_old_faithful' },
    { name: 'Leonardo DiCaprio Foundation', count: 11, pattern: 'cluster_grand_canyon' }
  ];

  const legendItems = [
    { status: 'Available', color: 'bg-emerald-500/20', borderColor: 'border-emerald-500' },
    { status: 'Reserved', color: 'bg-amber-500/20', borderColor: 'border-amber-500' }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border-2 border-slate-200/50 overflow-hidden max-w-xs">
      {/* Top Donors Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 border-b-2 border-emerald-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
            Top Conservation Supporters
          </h4>
        </div>
        <div className="space-y-2">
          {topDonors.map((donor, index) => {
            const colorConfig = DONOR_COLORS[donor.name];
            return (
              <div key={donor.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-6 h-6 rounded-md border-2 shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: colorConfig?.fill || '#64748b',
                      borderColor: colorConfig?.stroke || '#475569',
                      opacity: colorConfig?.fillOpacity || 0.6
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {donor.name}
                    </p>
                    <p className="text-[10px] text-slate-600 capitalize">
                      {donor.pattern.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 ml-2">
                  {donor.count}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-200/50">
          <p className="text-[10px] text-slate-600 font-semibold">
            128 total tiles sponsored
          </p>
          <p className="text-[9px] text-slate-500 mt-1 leading-tight">
            Colored clusters show conservation areas sponsored by major donors
          </p>
        </div>
      </div>

      {/* Tile Status Section */}
      <div className="p-4 bg-white">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Tile Status
        </h4>
        <div className="space-y-2">
          {legendItems.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color} border-2 ${item.borderColor}`} />
              <span className="text-sm text-slate-700">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

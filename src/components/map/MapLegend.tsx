'use client';

export function MapLegend() {
  const legendItems = [
    { status: 'Available', color: 'bg-emerald-500', borderColor: 'border-emerald-600' },
    { status: 'Reserved', color: 'bg-amber-400', borderColor: 'border-amber-500' },
    { status: 'Sold', color: 'bg-slate-500', borderColor: 'border-slate-600' }
  ];

  return (
    <div className="absolute bottom-4 left-4 glass-strong rounded-2xl shadow-xl p-4 space-y-3">
      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
        Tile Status
      </h4>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color} border ${item.borderColor}`} />
            <span className="text-sm text-slate-700">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

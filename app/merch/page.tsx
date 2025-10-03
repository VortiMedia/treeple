'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export default function MerchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="max-w-2xl w-full">
          <div className="glass-strong rounded-2xl p-8 md:p-12 space-y-6 text-center">
            {/* Icon/Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                Coming Soon
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Treeple Merch
              </h1>
              <p className="text-lg text-slate-600">
                Support conservation with official merchandise
              </p>
            </div>

            <div className="py-4">
              <p className="text-slate-600 max-w-lg mx-auto">
                Our merch store is launching soon! Stay tuned for eco-friendly apparel and accessories.
                Every purchase will support conservation efforts in our national parks.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 max-w-md mx-auto text-left">
              <div className="flex items-start gap-2">
                <span className="text-forest-600 mt-0.5">✓</span>
                <span>Sustainable materials</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-forest-600 mt-0.5">✓</span>
                <span>Eco-friendly packaging</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-forest-600 mt-0.5">✓</span>
                <span>Conservation donations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-forest-600 mt-0.5">✓</span>
                <span>Unique park designs</span>
              </div>
            </div>

            {/* Back to Map Link */}
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Map</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

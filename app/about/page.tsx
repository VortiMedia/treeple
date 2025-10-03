'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="max-w-2xl w-full">
          <div className="glass-strong rounded-2xl p-8 md:p-12 space-y-6 text-center">
            {/* Icon/Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-100 text-forest-600 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                About Treeple
              </h1>
              <p className="text-lg text-slate-600">
                Learn about our conservation mission
              </p>
            </div>

            <div className="py-4">
              <p className="text-slate-600 max-w-lg mx-auto">
                This page is coming soon. Check back later to learn more about how Treeple is helping preserve our national parks and wilderness areas.
              </p>
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

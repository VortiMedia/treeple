'use client';

import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="max-w-2xl w-full">
          <div className="glass-strong rounded-2xl p-8 md:p-12 space-y-6 text-center">
            {/* Icon/Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-100 text-forest-600 mx-auto">
              <User className="w-8 h-8" />
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 bg-forest-100 text-forest-700 text-sm font-medium rounded-full">
                Phase 2
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                My Account
              </h1>
              <p className="text-lg text-slate-600">
                Manage your tiles and profile
              </p>
            </div>

            <div className="py-4">
              <p className="text-slate-600 max-w-lg mx-auto">
                Account features are coming in Phase 2. Soon you&apos;ll be able to view your reserved tiles,
                manage your profile, and track your conservation impact.
              </p>
            </div>

            {/* Features Preview */}
            <div className="space-y-2 text-sm text-slate-600 max-w-md mx-auto">
              <p className="font-semibold text-slate-900 mb-3">Upcoming Features:</p>
              <div className="grid grid-cols-1 gap-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-forest-600 mt-0.5">•</span>
                  <span>View your reserved tiles on the map</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-forest-600 mt-0.5">•</span>
                  <span>Manage payment methods and receipts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-forest-600 mt-0.5">•</span>
                  <span>Track your conservation impact</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-forest-600 mt-0.5">•</span>
                  <span>Download personalized certificates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-forest-600 mt-0.5">•</span>
                  <span>Share your support on social media</span>
                </div>
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

'use client';

import { X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function SidePanel({ isOpen, onClose, title = 'Tile Details', children }: SidePanelProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    // Mobile: Bottom sheet
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />
          <SheetHeader className="mb-4">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-4rem)] pb-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Side panel
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 glass-strong shadow-2xl border-l border-slate-200/50 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close panel"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-5rem)] p-6">
          {children}
        </div>
      </div>
    </>
  );
}

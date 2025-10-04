'use client';

import { X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl" showClose={false}>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />
          <SheetHeader className="mb-4 flex flex-row items-center justify-between">
            <SheetTitle>{title}</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-w-[44px] min-h-[44px] -mr-2"
                aria-label="Close panel"
              >
                <X className="h-6 w-6 text-slate-600" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-4rem)] pb-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Right side sheet
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[480px] backdrop-blur-xl bg-white/95 border-l border-slate-200/50 p-0 overflow-y-auto transition-transform duration-300 ease-in-out"
        onPointerDownOutside={() => onClose()}
        showClose={false}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 backdrop-blur-xl bg-white/95 border-b border-slate-200/50 px-6 py-4 z-10 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500 mt-1">Yellowstone Conservation Grid</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-4"
            aria-label="Close panel"
          >
            <X className="h-5 w-5 text-slate-600" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

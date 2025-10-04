'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { MobileNav } from './MobileNav';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={`fixed top-4 left-4 right-4 z-50 ${className}`}>
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/90 rounded-2xl shadow-lg border border-slate-200/50 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Logo />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </Button>

            {/* Center/Right: Navigation with Auth */}
            <Navigation className="hidden md:flex" />
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

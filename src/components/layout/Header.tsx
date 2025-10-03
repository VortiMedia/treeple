'use client';

import { Logo } from './Logo';
import { Navigation } from './Navigation';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 h-16 glass-strong border-b border-slate-200/50 shadow-sm z-50 ${className}`}>
      <div className="w-full mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop Navigation */}
        <Navigation className="hidden md:flex" />

        {/* Right: Account placeholder (Phase 2) - responsive spacer */}
        <div className="w-24 hidden md:block" />
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
  badge?: string;
}

function NavLink({ href, label, badge }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-colors ${
        isActive
          ? 'text-slate-900'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {label}
      {badge && (
        <span className="absolute -top-2 -right-6 px-1.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded">
          {badge}
        </span>
      )}
      {isActive && (
        <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary" />
      )}
    </Link>
  );
}

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      <NavLink href="/" label="Map" />
      <NavLink href="/about" label="About" />
      <NavLink href="/merch" label="Merch" badge="Soon" />
      <NavLink href="/account" label="Account" />
    </nav>
  );
}

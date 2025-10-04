'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { User, LogOut, MapPin } from 'lucide-react';

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
      className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
        isActive
          ? 'text-emerald-600'
          : 'text-slate-700 hover:text-emerald-600'
      }`}
    >
      <span>{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded">
          {badge}
        </span>
      )}
      {isActive && (
        <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-emerald-600" />
      )}
    </Link>
  );
}

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  const { user, signOut } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <NavLink href="/" label="Explore" />
        <NavLink href="/about" label="About" />
        <NavLink href="/merch" label="Merch" badge="Soon" />
      </div>

      {/* Account Section */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={user.name || user.email} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.name || 'Account'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-tiles" className="cursor-pointer">
                <MapPin className="mr-2 h-4 w-4" />
                My Tiles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => setShowAuthDialog(true)}
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Sign In
        </Button>
      )}

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        defaultTab="signin"
      />
    </nav>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut, MapPin, Mountain } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/auth/AuthDialog';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const navLinks = [
    { href: '/', label: 'Explore' },
    { href: '/about', label: 'About' },
    { href: '/merch', label: 'Merch', badge: 'Soon' },
  ];

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="backdrop-blur-xl bg-white/95 border-r border-slate-200/50 w-[280px] sm:w-[320px]"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-left">
              <Mountain className="h-6 w-6 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900">Treeple</span>
                <span className="text-xs text-slate-500 font-normal">Yellowstone</span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col justify-between">
            {/* Navigation Links */}
            <div className="mt-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Block - Anchored to Bottom */}
            <div className="pb-6">
              <Separator className="mb-6" />

              {user ? (
                <div className="space-y-4">
                  {/* User Info Card */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-medium text-slate-900 truncate">
                        {user.name || 'User'}
                      </span>
                      <span className="text-xs text-slate-500 truncate">{user.email}</span>
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/my-tiles"
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>My Tiles</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 justify-start"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthDialog(true)}
                  variant="outline"
                  className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 h-11"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
}

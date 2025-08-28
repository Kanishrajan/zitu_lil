
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import BottomNav from './bottom-nav';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isBiddingArena = pathname.startsWith('/bidding/');
  const isSettingsOrLeaderboard = pathname.startsWith('/settings') || pathname.startsWith('/leaderboard');


  // A simple check to see if we should show the main layout
  // In a real app, you'd have a proper auth state check
  const showBottomNav = !isAuthPage && !isBiddingArena && !isSettingsOrLeaderboard;
  const showHeader = !isAuthPage && !isBiddingArena;

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      {showHeader && <Header />}
      <main className={`flex-1 ${showHeader ? 'pb-24 pt-16' : ''}`}>{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

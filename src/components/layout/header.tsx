
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Bell, Send, Settings, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isProfilePage = pathname === '/network';
  const isSettingsPage = pathname.startsWith('/settings');
  const isLeaderboardPage = pathname === '/leaderboard';


  const handleBack = () => {
    router.back();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      {isSettingsPage || isLeaderboardPage ? (
        <Button onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
      ) : (
        <Link href="/leaderboard" aria-label="Leaderboard">
            <Logo className="h-7" />
        </Link>
      )}
      
      <div className="flex items-center gap-2">
        {isProfilePage ? (
            <Button asChild variant="ghost" size="icon">
                <Link href="/settings">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Link>
            </Button>
        ) : isSettingsPage || isLeaderboardPage ? (
          // Hides icons on these pages, title is in the page content or the component itself
          <h1 className="text-xl font-bold tracking-tight">
            {isSettingsPage && 'Settings'}
            {isLeaderboardPage && 'Leaderboard'}
          </h1>
        ) : (
          <>
            <Button asChild variant="ghost" size="icon">
              <Link href="#">
                <Send />
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="/notifications">
                <Bell />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
          </>
        )}
      </div>

       {/* This is a spacer to center the title on settings/leaderboard pages */}
       {(isSettingsPage || isLeaderboardPage) && <div className="w-10"></div>}
    </header>
  );
}


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
  const isMessagesPage = pathname === '/messages';


  const handleBack = () => {
    router.back();
  }

  const getTitle = () => {
    if (isSettingsPage) return 'Settings';
    if (isLeaderboardPage) return 'Leaderboard';
    if (isMessagesPage) return 'Messages';
    return '';
  }

  const showBackButton = isSettingsPage || isLeaderboardPage || isMessagesPage;
  const pageTitle = getTitle();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      {showBackButton ? (
        <Button onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
      ) : (
        <Link href="/leaderboard" aria-label="Leaderboard">
            <Logo className="h-7" />
        </Link>
      )}
      
      <div className="absolute left-1/2 -translate-x-1/2">
        {pageTitle && <h1 className="text-xl font-bold tracking-tight">{pageTitle}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {isProfilePage ? (
            <Button asChild variant="ghost" size="icon">
                <Link href="/settings">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Link>
            </Button>
        ) : showBackButton ? (
          // This is a spacer to center the title correctly when icons are hidden
          <div className="w-10"></div>
        ) : (
          <>
            <Button asChild variant="ghost" size="icon">
              <Link href="/messages">
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
    </header>
  );
}

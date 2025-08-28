
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
  const isSettingsPage = pathname === '/settings';
  const isSettingsSubPage = pathname.startsWith('/settings/');

  const handleBack = () => {
    router.back();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      {isSettingsPage || isSettingsSubPage ? (
        <Button onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
      ) : (
        <Link href="/" aria-label="Home">
            <Logo className="h-7" />
        </Link>
      )}
      
      {isProfilePage ? (
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
                <Link href="/settings">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Link>
            </Button>
        </div>
      ) : isSettingsPage || isSettingsSubPage ? (
        // Hides all icons on settings pages, title is in the page content
        <div></div>
      ) : (
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="#">
              <Send />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="#">
              <Bell />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}

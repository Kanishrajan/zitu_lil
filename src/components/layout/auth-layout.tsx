
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import BottomNav from './bottom-nav';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // A simple check to see if we should show the main layout
  // In a real app, you'd have a proper auth state check
  const showMainLayout = !isAuthPage;

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      {showMainLayout && <Header />}
      <main className={`flex-1 ${showMainLayout ? 'pb-24 pt-16' : ''}`}>{children}</main>
      {showMainLayout && <BottomNav />}
    </div>
  );
}

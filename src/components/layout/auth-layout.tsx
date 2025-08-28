
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import BottomNav from './bottom-nav';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 pt-16">{children}</main>
      <BottomNav />
    </div>
  );
}

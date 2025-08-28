import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Bell, Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      <Link href="/" aria-label="Home">
        <Logo className="h-7" />
      </Link>
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
    </header>
  );
}

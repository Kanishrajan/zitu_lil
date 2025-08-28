import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost">
            <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Link>
        </Button>
        <Button asChild>
            <Link href="/signup">
                Sign Up
            </Link>
        </Button>
      </div>
    </header>
  );
}

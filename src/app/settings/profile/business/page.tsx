
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BusinessInfoPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
        <header className="flex items-center justify-center relative py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Business Info</h1>
        </header>

        <div className="mt-4">
             <EmptyState
                icon={Briefcase}
                title="Coming Soon"
                description="You'll soon be able to manage your business information from this screen."
            />
        </div>
    </div>
  );
}

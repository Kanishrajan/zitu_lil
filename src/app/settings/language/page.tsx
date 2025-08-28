
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Languages } from 'lucide-react';

export default function LanguageCurrencyPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Language & Currency</h1>
        <EmptyState
            icon={Languages}
            title="Coming Soon"
            description="Soon, you'll be able to change the app's language and set your preferred currency."
        />
      </div>
    </div>
  );
}

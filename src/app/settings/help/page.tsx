
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <EmptyState
            icon={HelpCircle}
            title="Coming Soon"
            description="Our help and support center, including FAQs and contact options, will be available here soon."
        />
      </div>
    </div>
  );
}

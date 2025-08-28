
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Terms & Conditions</h1>
        <EmptyState
            icon={FileText}
            title="Coming Soon"
            description="Our terms and conditions will be published here soon. Please check back later."
        />
      </div>
    </div>
  );
}

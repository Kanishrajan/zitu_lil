
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Download } from 'lucide-react';

export default function DownloadDataPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Download Your Data</h1>
        <EmptyState
            icon={Download}
            title="Coming Soon"
            description="We're working on a feature to allow you to download all of your data in a portable format."
        />
      </div>
    </div>
  );
}

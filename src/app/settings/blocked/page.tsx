
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Ban } from 'lucide-react';

export default function BlockedUsersPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Blocked Users</h1>
        <EmptyState
          icon={Ban}
          title="Coming Soon"
          description="You'll soon be able to manage users you've blocked from this screen."
        />
      </div>
    </div>
  );
}

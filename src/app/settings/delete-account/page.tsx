
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Trash2 } from 'lucide-react';

export default function DeleteAccountPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Delete Account</h1>
        <EmptyState
            icon={Trash2}
            title="Coming Soon"
            description="The ability to permanently delete your account and all associated data is being implemented."
        />
      </div>
    </div>
  );
}

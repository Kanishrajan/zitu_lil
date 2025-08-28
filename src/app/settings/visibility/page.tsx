
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Eye } from 'lucide-react';

export default function ProfileVisibilityPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile Visibility</h1>
         <EmptyState
            icon={Eye}
            title="Coming Soon"
            description="Soon you will be able to control who can see your profile and posts."
        />
      </div>
    </div>
  );
}


'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <EmptyState
            icon={Bell}
            title="Coming Soon"
            description="Granular control over your email and push notifications is on its way."
        />
      </div>
    </div>
  );
}

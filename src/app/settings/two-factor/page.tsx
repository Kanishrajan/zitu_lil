
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { ShieldCheck } from 'lucide-react';

export default function TwoFactorPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Two-Factor Authentication</h1>
        <EmptyState
            icon={ShieldCheck}
            title="Coming Soon"
            description="Enhance your account security with two-factor authentication. This feature is coming soon."
        />
      </div>
    </div>
  );
}

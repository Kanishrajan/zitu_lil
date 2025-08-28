
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <EmptyState
            icon={FileText}
            title="Coming Soon"
            description="Our full privacy policy will be available here shortly. Your privacy is important to us."
        />
      </div>
    </div>
  );
}

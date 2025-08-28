
'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { Palette } from 'lucide-react';

export default function AppearancePage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 h-full">
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
            <EmptyState 
                icon={Palette}
                title="Coming Soon"
                description="This feature is under construction. You'll soon be able to customize the look and feel of the app."
            />
        </div>
    </div>
  );
}

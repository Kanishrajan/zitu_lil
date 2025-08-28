
'use client';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full gap-4 text-center p-8", className)}>
      <div className="p-4 bg-secondary rounded-full animate-in fade-in-0 zoom-in-50 duration-500">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className='animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200'>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-xs mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

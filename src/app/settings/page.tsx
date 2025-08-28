
'use client';

import { Bell, Brush, ChevronRight, HelpCircle, Lock, User } from 'lucide-react';

const settingsItems = [
  { icon: User, text: 'Account', description: 'Manage your account details.' },
  { icon: Lock, text: 'Privacy', description: 'Control your privacy settings.' },
  { icon: Bell, text: 'Notifications', description: 'Adjust your notification preferences.' },
  { icon: Brush, text: 'Appearance', description: 'Customize the look and feel.' },
  { icon: HelpCircle, text: 'Help & Support', description: 'Get help and find answers.' },
];

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <div className="space-y-2">
          {settingsItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between p-4 rounded-lg bg-card cursor-pointer hover:bg-accent"
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-6 h-6 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium">{item.text}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

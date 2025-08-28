
'use client';

import { User, Briefcase, Mail, Settings, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SettingsItemProps = {
  icon: React.ElementType;
  text: string;
  description: string;
  href: string;
};

function SettingsItem({ icon: Icon, text, description, href }: SettingsItemProps) {
  return (
    <Link href={href} className="flex items-center justify-between p-4 rounded-lg bg-card cursor-pointer hover:bg-accent">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium">{text}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </Link>
  );
}

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-2xl py-4">
       <header className="flex items-center justify-center relative py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Edit Profile</h1>
        </header>

      <div className="space-y-6 mt-4">
        <SettingsItem 
          icon={User} 
          text="Personal Info" 
          description="Update your name, bio, and profile picture."
          href="/settings/profile/personal"
        />
        <SettingsItem 
          icon={Briefcase} 
          text="Business Info" 
          description="Manage your company details and category."
          href="/settings/profile/business"
        />
        <SettingsItem 
          icon={Mail} 
          text="Contact Info" 
          description="Update your email and communication settings."
          href="/settings/profile/contact"
        />
        <SettingsItem 
          icon={Settings} 
          text="Preferences" 
          description="Adjust your app and notification preferences."
          href="/settings/notifications"
        />
      </div>
    </div>
  );
}

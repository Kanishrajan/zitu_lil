
'use client';

import { 
  User, 
  Lock, 
  Bell, 
  Brush, 
  HelpCircle, 
  ChevronRight, 
  ShieldCheck, 
  FileText,
  LogOut,
  AtSign,
  Languages,
  Download,
  Ban,
  Eye,
  Trash2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

type SettingsItemProps = {
  icon: React.ElementType;
  text: string;
  description?: string;
  onClick?: () => void;
};

function SettingsItem({ icon: Icon, text, description, onClick }: SettingsItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-lg bg-card cursor-pointer hover:bg-accent"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium">{text}</span>
          {description && <span className="text-sm text-muted-foreground">{description}</span>}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}

type SectionTitleProps = {
    title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
    return <h2 className="text-xl font-semibold tracking-tight px-4 pt-6 pb-2">{title}</h2>;
}


export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-4 mb-24">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight px-4">Settings</h1>
        
        <SectionTitle title="Account" />
        <div className="space-y-2">
            <SettingsItem icon={User} text="Edit Profile" description="Update name, bio, and profile photo" />
            <SettingsItem icon={AtSign} text="Change Email or Phone" />
            <SettingsItem icon={Lock} text="Change Password" />
        </div>

        <Separator />

        <SectionTitle title="Privacy & Security" />
        <div className="space-y-2">
            <SettingsItem icon={ShieldCheck} text="Two-Factor Authentication" />
            <SettingsItem icon={Eye} text="Profile Visibility" description="Control who can see your profile" />
            <SettingsItem icon={Ban} text="Blocked Users" />
            <SettingsItem icon={Download} text="Download Your Data" />
            <SettingsItem icon={Trash2} text="Delete Account" />
        </div>

        <Separator />
        
        <SectionTitle title="Preferences" />
        <div className="space-y-2">
            <SettingsItem icon={Bell} text="Notifications" description="Adjust your notification preferences" />
            <SettingsItem icon={Brush} text="Appearance" description="Customize the look and feel" />
            <SettingsItem icon={Languages} text="Language & Currency" />
        </div>

        <Separator />

        <SectionTitle title="Support & About" />
        <div className="space-y-2">
            <SettingsItem icon={HelpCircle} text="Help & Support" />
            <SettingsItem icon={FileText} text="Terms & Conditions" />
            <SettingsItem icon={FileText} text="Privacy Policy" />
        </div>

        <Separator />

        <div className="p-4">
             <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>

      </div>
    </div>
  );
}

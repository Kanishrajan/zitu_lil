
'use client';

import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const themes = [
    { name: 'Default', class: 'dark', primary: 'hsl(0 0% 98%)', bg: 'hsl(0 0% 3.9%)' },
    { name: 'Light', class: 'light', primary: 'hsl(0 0% 9%)', bg: 'hsl(0 0% 100%)' },
    { name: 'Emerald', class: 'dark-emerald', primary: 'hsl(142.1 76.2% 36.3%)', bg: 'hsl(150 14% 10%)' },
    { name: 'Indigo', class: 'dark-indigo', primary: 'hsl(221.2 83.2% 53.3%)', bg: 'hsl(224 20% 12%)' },
];


export default function AppearancePage() {
    const applyTheme = (themeClass: string) => {
        document.documentElement.className = themeClass;
    }

    return (
        <div className="container mx-auto max-w-2xl py-4">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
                    <p className="text-muted-foreground">
                        Customize the look and feel of the app.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>Select a theme for the application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {themes.map((theme) => (
                                <div key={theme.name} className="space-y-2">
                                     <Button
                                        variant="outline"
                                        className="h-20 w-full"
                                        onClick={() => applyTheme(theme.class)}
                                    >
                                        <div className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                            <div className="space-y-1 rounded-sm p-1.5">
                                                <div className="space-y-1 rounded-md p-1 shadow-sm" style={{ backgroundColor: theme.bg }}>
                                                    <div className="h-2 w-10 rounded-lg" style={{ backgroundColor: theme.primary }} />
                                                    <div className="space-y-1">
                                                        <div className="h-2 w-8 rounded-lg bg-muted" />
                                                        <div className="h-2 w-6 rounded-lg bg-muted" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Button>
                                    <p className="text-center text-sm font-medium">{theme.name}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

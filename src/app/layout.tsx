
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthLayout } from '@/components/layout/auth-layout';

// This is a workaround to make metadata work in a client component.
// In a real app, you would move this to a server component.
// export const metadata: Metadata = {
//   title: 'ZITU',
//   description: 'Connect, Discover, and Trade.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>ZITU</title>
        <meta name="description" content="Connect, Discover, and Trade." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <AuthLayout>
            {children}
          </AuthLayout>
        <Toaster />
      </body>
    </html>
  );
}

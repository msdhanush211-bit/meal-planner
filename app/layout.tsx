import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'MealPlanner — Plan your week',
  description: 'Plan your weekly meals with drag and drop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
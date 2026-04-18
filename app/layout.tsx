import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Meal Planner',
  description: 'Plan your weekly meals',
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
          <Navbar />
          <main className="ml-56 min-h-screen p-8 bg-gray-50">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
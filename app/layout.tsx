import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

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
        <Navbar />
        <main className="ml-56 min-h-screen p-8 bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
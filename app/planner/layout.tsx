import Navbar from '@/components/Navbar';

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="ml-56 min-h-screen p-8 bg-gray-50">
        {children}
      </main>
    </>
  );
}
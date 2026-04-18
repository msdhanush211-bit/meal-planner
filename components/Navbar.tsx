'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, BookOpen, ShoppingCart } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Planner', icon: Calendar },
  { href: '/recipes', label: 'Recipes', icon: BookOpen },
  { href: '/grocery', label: 'Grocery', icon: ShoppingCart },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 flex flex-col p-4">
      <div className="mb-8 mt-2">
        <h1 className="text-xl font-bold text-green-600">🍽️ MealPlanner</h1>
        <p className="text-xs text-gray-400 mt-1">Plan your week</p>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              pathname === href
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
'use client';

import { useState } from 'react';
import { Printer, CheckSquare } from 'lucide-react';

const GROCERY_ITEMS = [
  { id: '1', name: 'Oats', qty: '2 cups', category: 'Pantry' },
  { id: '2', name: 'Blueberries', qty: '1 cup', category: 'Produce' },
  { id: '3', name: 'Eggs', qty: '6', category: 'Dairy & Eggs' },
  { id: '4', name: 'Milk', qty: '2 cups', category: 'Dairy & Eggs' },
  { id: '5', name: 'Butter', qty: '3 tbsp', category: 'Dairy & Eggs' },
  { id: '6', name: 'Flour', qty: '1 cup', category: 'Pantry' },
  { id: '7', name: 'Romaine Lettuce', qty: '1 head', category: 'Produce' },
  { id: '8', name: 'Parmesan', qty: '30g', category: 'Dairy & Eggs' },
  { id: '9', name: 'Chicken Breast', qty: '400g', category: 'Meat' },
  { id: '10', name: 'Spaghetti', qty: '200g', category: 'Pantry' },
  { id: '11', name: 'Tomato Sauce', qty: '400g', category: 'Pantry' },
  { id: '12', name: 'Onion', qty: '2', category: 'Produce' },
  { id: '13', name: 'Coconut Milk', qty: '400ml', category: 'Pantry' },
  { id: '14', name: 'Curry Paste', qty: '2 tbsp', category: 'Pantry' },
  { id: '15', name: 'Broccoli', qty: '1 cup', category: 'Produce' },
  { id: '16', name: 'Noodles', qty: '200g', category: 'Pantry' },
];

const CATEGORIES = ['Produce', 'Dairy & Eggs', 'Meat', 'Pantry'];

export default function GroceryPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearChecked = () => setChecked(new Set());
  const remaining = GROCERY_ITEMS.length - checked.size;
  const progress = Math.round((checked.size / GROCERY_ITEMS.length) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Grocery List</h2>
          <p className="text-gray-500 text-sm mt-1">{remaining} items remaining</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearChecked}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
          >
            <CheckSquare size={16} />
            Clear checked
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600"
          >
            <Printer size={16} />
            Print list
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map(category => {
          const items = GROCERY_ITEMS.filter(i => i.category === category);
          return (
            <div key={category} className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                {category}
              </h3>
              <div className="flex flex-col gap-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0 cursor-pointer group"
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      checked.has(item.id)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {checked.has(item.id) && <span className="text-xs">✓</span>}
                    </div>
                    <span className={`flex-1 text-sm ${
                      checked.has(item.id) ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-800">Progress</p>
          <p className="text-xs text-green-600">{checked.size} of {GROCERY_ITEMS.length} items checked</p>
        </div>
        <div className="w-48 bg-green-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
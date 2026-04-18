'use client';

import { useState } from 'react';
import { Search, Star, Clock } from 'lucide-react';

const ALL_RECIPES = [
  { id: '1', name: 'Oats & Berries', emoji: '🥣', calories: 320, time: '10 min', category: 'breakfast', fav: true, notes: '' },
  { id: '2', name: 'Pancakes', emoji: '🥞', calories: 450, time: '20 min', category: 'breakfast', fav: false, notes: '' },
  { id: '3', name: 'Caesar Salad', emoji: '🥗', calories: 280, time: '15 min', category: 'lunch', fav: true, notes: '' },
  { id: '4', name: 'Club Sandwich', emoji: '🥪', calories: 520, time: '10 min', category: 'lunch', fav: false, notes: '' },
  { id: '5', name: 'Spaghetti Bolognese', emoji: '🍝', calories: 620, time: '40 min', category: 'dinner', fav: true, notes: '' },
  { id: '6', name: 'Chicken Curry', emoji: '🍛', calories: 580, time: '35 min', category: 'dinner', fav: false, notes: '' },
  { id: '7', name: 'Scrambled Eggs', emoji: '🥚', calories: 250, time: '8 min', category: 'breakfast', fav: false, notes: '' },
  { id: '8', name: 'Veggie Noodles', emoji: '🍜', calories: 380, time: '20 min', category: 'dinner', fav: false, notes: '' },
];

type Recipe = typeof ALL_RECIPES[0];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(ALL_RECIPES);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Recipe | null>(null);

  const toggleFav = (id: string) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, fav: !r.fav } : r));
  };

  const filtered = recipes.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.category === filter || (filter === 'favourites' && r.fav);
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Recipes</h2>
          <p className="text-gray-500 text-sm mt-1">{recipes.length} recipes in your library</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
        >
          <option value="all">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="favourites">Favourites</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => setSelected(recipe)}
            className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-green-300 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-4xl">{recipe.emoji}</span>
              <button
                onClick={e => { e.stopPropagation(); toggleFav(recipe.id); }}
                className={`text-xl ${recipe.fav ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            </div>
            <h3 className="font-medium text-gray-800 text-sm mb-2">{recipe.name}</h3>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={11} />{recipe.time}</span>
              <span>{recipe.calories} cal</span>
            </div>
            <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full capitalize">
              {recipe.category}
            </span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4 text-center">{selected.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-1">{selected.name}</h3>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
              <span>{selected.time}</span>
              <span>{selected.calories} calories</span>
              <span className="capitalize">{selected.category}</span>
            </div>
            <textarea
              placeholder="Add personal notes about this recipe..."
              defaultValue={selected.notes}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:border-green-400"
            />
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
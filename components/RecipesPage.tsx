'use client';

import { useState } from 'react';
import { Search, Clock, Plus, X } from 'lucide-react';

const INITIAL_RECIPES = [
  { id: '1', name: 'Oats & Berries', emoji: '🥣', calories: 320, time: '10 min', category: 'breakfast', fav: true },
  { id: '2', name: 'Pancakes', emoji: '🥞', calories: 450, time: '20 min', category: 'breakfast', fav: false },
  { id: '3', name: 'Caesar Salad', emoji: '🥗', calories: 280, time: '15 min', category: 'lunch', fav: true },
  { id: '4', name: 'Club Sandwich', emoji: '🥪', calories: 520, time: '10 min', category: 'lunch', fav: false },
  { id: '5', name: 'Spaghetti Bolognese', emoji: '🍝', calories: 620, time: '40 min', category: 'dinner', fav: true },
  { id: '6', name: 'Chicken Curry', emoji: '🍛', calories: 580, time: '35 min', category: 'dinner', fav: false },
  { id: '7', name: 'Scrambled Eggs', emoji: '🥚', calories: 250, time: '8 min', category: 'breakfast', fav: false },
  { id: '8', name: 'Veggie Noodles', emoji: '🍜', calories: 380, time: '20 min', category: 'dinner', fav: false },
];

type Recipe = {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  time: string;
  category: string;
  fav: boolean;
};

const EMOJIS = ['🥣','🥞','🥗','🥪','🍝','🍛','🥚','🍜','🍲','🥘','🍱','🥙','🌮','🍕','🥑','🍣','🍔','🥩','🍗','🥦'];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    emoji: '🍽️',
    calories: '',
    time: '',
    category: 'breakfast',
  });

  const toggleFav = (id: string) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, fav: !r.fav } : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    setSelected(null);
  };

  const addRecipe = () => {
    if (!form.name || !form.calories || !form.time) return;
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      name: form.name,
      emoji: form.emoji,
      calories: parseInt(form.calories),
      time: form.time,
      category: form.category,
      fav: false,
    };
    setRecipes(prev => [newRecipe, ...prev]);
    setForm({ name: '', emoji: '🍽️', calories: '', time: '', category: 'breakfast' });
    setShowForm(false);
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
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-all"
        >
          <Plus size={16} />
          Add recipe
        </button>
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
              >★</button>
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

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-lg">Add new recipe</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Recipe name</label>
                <input
                  type="text"
                  placeholder="e.g. Avocado Toast"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Pick an emoji</label>
                <div className="grid grid-cols-10 gap-1">
                  {EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setForm(f => ({ ...f, emoji }))}
                      className={`text-xl p-1 rounded-lg transition-all ${form.emoji === emoji ? 'bg-green-100 scale-110' : 'hover:bg-gray-100'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Calories</label>
                  <input
                    type="number"
                    placeholder="e.g. 350"
                    value={form.calories}
                    onChange={e => setForm(f => ({ ...f, calories: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Cook time</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 min"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <button
                onClick={addRecipe}
                className="w-full bg-green-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Add recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4 text-center">{selected.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-1">{selected.name}</h3>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
              <span>{selected.time}</span>
              <span>{selected.calories} cal</span>
              <span className="capitalize">{selected.category}</span>
            </div>
            <textarea
              placeholder="Add personal notes..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:border-green-400"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => deleteRecipe(selected.id)}
                className="flex-1 border border-red-200 text-red-500 py-2 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
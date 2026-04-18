'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

const SAMPLE_RECIPES = [
  { id: '1', name: 'Oats & Berries', emoji: '🥣', calories: 320 },
  { id: '2', name: 'Pancakes', emoji: '🥞', calories: 450 },
  { id: '3', name: 'Caesar Salad', emoji: '🥗', calories: 280 },
  { id: '4', name: 'Club Sandwich', emoji: '🥪', calories: 520 },
  { id: '5', name: 'Spaghetti', emoji: '🍝', calories: 620 },
  { id: '6', name: 'Chicken Curry', emoji: '🍛', calories: 580 },
  { id: '7', name: 'Scrambled Eggs', emoji: '🥚', calories: 250 },
  { id: '8', name: 'Veggie Noodles', emoji: '🍜', calories: 380 },
];

type Recipe = { id: string; name: string; emoji: string; calories: number };
type PlanType = { [key: string]: Recipe };

export default function WeeklyPlanner() {
  const [plan, setPlan] = useState<PlanType>({});
  const [showPicker, setShowPicker] = useState<string | null>(null);

  const assignMeal = (day: string, meal: string, recipe: Recipe) => {
    setPlan(prev => ({ ...prev, [`${day}-${meal}`]: recipe }));
    setShowPicker(null);
  };

  const clearMeal = (day: string, meal: string) => {
    setPlan(prev => {
      const next = { ...prev };
      delete next[`${day}-${meal}`];
      return next;
    });
  };

  const totalMeals = Object.keys(plan).length;
  const totalCalories = Object.values(plan).reduce((sum, r) => sum + r.calories, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Weekly Planner</h2>
          <p className="text-gray-500 text-sm mt-1">Click any cell to assign a meal</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-50 rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-gray-500">Meals planned</p>
            <p className="text-xl font-bold text-green-600">{totalMeals}</p>
          </div>
          <div className="bg-blue-50 rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-gray-500">Total calories</p>
            <p className="text-xl font-bold text-blue-600">{totalCalories}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-24 p-3 text-left text-sm font-medium text-gray-500"></th>
              {DAYS.map(day => (
                <th key={day} className="p-3 text-center text-sm font-medium text-gray-600 min-w-[120px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEALS.map(meal => (
              <tr key={meal}>
                <td className="p-3 text-sm font-medium text-gray-500 align-top pt-4">{meal}</td>
                {DAYS.map(day => {
                  const key = `${day}-${meal}`;
                  const assigned = plan[key];
                  return (
                    <td key={day} className="p-2">
                      {assigned ? (
                        <div className="bg-white border border-green-200 rounded-xl p-3 relative group">
                          <button
                            onClick={() => clearMeal(day, meal)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                          <div className="text-2xl mb-1">{assigned.emoji}</div>
                          <div className="text-xs font-medium text-gray-700 leading-tight">{assigned.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{assigned.calories} cal</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowPicker(key)}
                          className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 hover:border-green-300 hover:text-green-400 transition-all"
                        >
                          <Plus size={20} />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPicker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowPicker(null)}>
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-800 mb-4">Choose a recipe</h3>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_RECIPES.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => {
                    const [day, meal] = showPicker.split('-');
                    assignMeal(day, meal, recipe);
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-left"
                >
                  <span className="text-xl">{recipe.emoji}</span>
                  <div>
                    <div className="text-xs font-medium text-gray-700">{recipe.name}</div>
                    <div className="text-xs text-gray-400">{recipe.calories} cal</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowPicker(null)} className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
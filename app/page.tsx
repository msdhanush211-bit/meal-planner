import Link from 'next/link';
import { Calendar, BookOpen, ShoppingCart, Star, Zap, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-gray-800 text-lg">MealPlanner</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2">
            Sign in
          </Link>
          <Link href="/login" className="text-sm bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all">
            Get started free
          </Link>
        </div>
      </nav>

      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Plan smarter. Eat better.
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Your weekly meals,<br />
          <span className="text-green-500">planned in minutes</span>
        </h1>
        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          Drag and drop meals onto your weekly calendar, manage your recipe library, and auto-generate your grocery list.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/planner" className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-all text-sm">
            Start planning →
          </Link>
          <Link href="/recipes" className="border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all text-sm">
            Browse recipes
          </Link>
        </div>
      </section>

      <section className="px-8 py-6 max-w-5xl mx-auto mb-16">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs text-gray-400 ml-2">mealplanner.app</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Weekly Planner</h3>
                <div className="flex gap-2">
                  <div className="bg-green-50 rounded-lg px-3 py-1 text-xs text-green-600 font-medium">5 meals planned</div>
                  <div className="bg-blue-50 rounded-lg px-3 py-1 text-xs text-blue-600 font-medium">2,450 cal</div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
                  <div key={day}>
                    <div className="text-xs text-gray-400 text-center mb-2">{day}</div>
                    <div className={`rounded-lg p-2 text-center text-xs min-h-[60px] flex flex-col items-center justify-center ${
                      i === 0 ? 'bg-green-50 border border-green-200' :
                      i === 1 ? 'bg-orange-50 border border-orange-200' :
                      i === 3 ? 'bg-purple-50 border border-purple-200' :
                      i === 4 ? 'bg-blue-50 border border-blue-200' :
                      i === 5 ? 'bg-yellow-50 border border-yellow-200' :
                      'border border-dashed border-gray-200'
                    }`}>
                      {i === 0 && <><div className="text-lg">🥗</div><div className="text-gray-600 mt-1">Caesar</div></>}
                      {i === 1 && <><div className="text-lg">🍝</div><div className="text-gray-600 mt-1">Pasta</div></>}
                      {i === 2 && <div className="text-gray-300 text-lg">+</div>}
                      {i === 3 && <><div className="text-lg">🍛</div><div className="text-gray-600 mt-1">Curry</div></>}
                      {i === 4 && <><div className="text-lg">🥪</div><div className="text-gray-600 mt-1">Sandwich</div></>}
                      {i === 5 && <><div className="text-lg">🥞</div><div className="text-gray-600 mt-1">Pancakes</div></>}
                      {i === 6 && <div className="text-gray-300 text-lg">+</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Everything you need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, color: 'bg-green-50 text-green-600', title: 'Drag & drop planner', desc: 'Plan breakfast, lunch and dinner for the whole week with a beautiful drag and drop interface.' },
            { icon: BookOpen, color: 'bg-blue-50 text-blue-600', title: 'Recipe library', desc: 'Save your favourite recipes with photos, notes, calories and cooking time. Search and filter easily.' },
            { icon: ShoppingCart, color: 'bg-purple-50 text-purple-600', title: 'Smart grocery list', desc: 'Automatically generate a grocery list from your meal plan. Print or export with one click.' },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, label: 'Fast & easy', desc: 'Plan your entire week in under 5 minutes' },
            { icon: Star, label: 'Save favourites', desc: 'Star your best recipes for quick access' },
            { icon: Shield, label: 'Secure & private', desc: 'Your data is safe and only yours' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 p-4">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">{label}</p>
                <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-20 text-center">
        <div className="bg-green-50 rounded-3xl p-12 max-w-2xl mx-auto border border-green-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Start planning today</h2>
          <p className="text-gray-500 mb-8">Join thousands of people eating healthier with MealPlanner.</p>
          <Link href="/planner" className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-all text-sm inline-block">
            Get started free →
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-8 py-6 text-center">
        <p className="text-gray-400 text-sm">🍽️ MealPlanner — Built with Next.js, TypeScript & Tailwind CSS</p>
      </footer>

    </div>
  );
}
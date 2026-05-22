# 🍽️ MealPlanner

A full-stack weekly meal planning application built with Next.js, TypeScript, and Tailwind CSS.

🌐 **Live Demo:** [meal-planner-nine-gilt.vercel.app](https://meal-planner-nine-gilt.vercel.app)

---

## ✨ Features

- 📅 **Weekly Drag & Drop Planner** — Plan breakfast, lunch and dinner for the whole week
- 📖 **Recipe Library** — Save recipes with emoji, calories, cook time and category
- ➕ **Custom Recipes** — Add your own recipes with a beautiful form
- ⭐ **Favourites** — Star your favourite recipes for quick access
- 🔍 **Search & Filter** — Find recipes by name or category instantly
- 🛒 **Smart Grocery List** — Auto-generated from your meal plan with checkboxes
- 🖨️ **Print Grocery List** — Print your list with one click
- 🔐 **Authentication** — Login with Google or demo credentials
- 💾 **Database** — Recipes saved permanently with PostgreSQL (Neon)
- 🚀 **Deployed** — Live on Vercel with CI/CD via GitHub

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS v4 | Utility-first styling |
| NextAuth.js | Authentication (Google OAuth) |
| Prisma ORM | Database access |
| PostgreSQL (Neon) | Cloud database |
| @hello-pangea/dnd | Drag and drop |
| Vercel | Deployment & hosting |
| GitHub | Version control & CI/CD |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/msdhanush211-bit/meal-planner.git
cd meal-planner
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables — create `.env.local`:
4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
---

## 🔑 Demo Credentials

You can try the app without Google login:
- **Email:** demo@meal.com
- **Password:** password123

---

## 👨‍💻 Author

**Dhanush** — [@msdhanush211-bit](https://github.com/msdhanush211-bit)

---

## 📄 License

MIT License
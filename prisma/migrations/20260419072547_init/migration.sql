-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fav" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "meal" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeEmoji" TEXT NOT NULL,
    "recipeCalories" INTEGER NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

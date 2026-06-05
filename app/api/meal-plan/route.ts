import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const meals = await prisma.mealPlan.findMany();
    return NextResponse.json(meals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch meal plan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { day, meal, recipeId, recipeName, recipeEmoji, recipeCalories } = body;

    const existing = await prisma.mealPlan.findFirst({
      where: { day, meal },
    });

    if (existing) {
      const updated = await prisma.mealPlan.update({
        where: { id: existing.id },
        data: { recipeId, recipeName, recipeEmoji, recipeCalories },
      });
      return NextResponse.json(updated);
    }

    const created = await prisma.mealPlan.create({
      data: { day, meal, recipeId, recipeName, recipeEmoji, recipeCalories },
    });
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save meal' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const meal = searchParams.get('meal');

    if (!day || !meal) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    await prisma.mealPlan.deleteMany({ where: { day, meal } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 });
  }
}
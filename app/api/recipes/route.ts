import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        emoji: body.emoji,
        calories: body.calories,
        time: body.time,
        category: body.category,
        fav: body.fav || false,
        notes: body.notes || '',
      },
    });
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    await prisma.recipe.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        id: data.id || undefined,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        images: JSON.stringify(data.images || []),
        category: data.category,
        stock: parseInt(data.stock, 10),
        vendor: 'tranquil', // Placeholder
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCTS_POST]', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

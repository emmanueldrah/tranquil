import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const formattedProducts = products.map(p => ({
      ...p,
      description: p.description || '',
      category: p.category || '',
      images: JSON.parse(p.images as string),
      rating: { average: 4.0, count: 0 }, // Default rating
      reviews: 0, // Default reviews count
      isOnSale: false,
      createdAt: p.createdAt?.toISOString() || new Date().toISOString(),
      status: p.stock > 0 ? 'active' : 'out_of_stock', // Add status based on stock
      sales: 0, // Default sales count
      brand: p.vendor // Use vendor as brand
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products for admin:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const product = await prisma.product.findUnique({ where: { id: resolvedParams.id } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    // Parse JSON fields
    const parsedProduct = {
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      variants: product.variants ? JSON.parse(product.variants) : undefined,
      seo: (product as any).seo ? JSON.parse((product as any).seo) : undefined,
      tags: (product as any).tags ? JSON.parse((product as any).tags) : undefined,
    };
    return NextResponse.json(parsedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await request.json();
    const product = await (prisma.product.update as any)({
      where: { id: resolvedParams.id },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
        images: data.images ? JSON.stringify(data.images) : undefined,
        category: data.category,
        subcategory: data.subcategory,
        brand: data.brand,
        vendor: data.vendor,
        specifications: data.specifications ? JSON.stringify(data.specifications) : undefined,
        isOnSale: data.isOnSale,
        salePrice: data.salePrice,
        variants: data.variants ? JSON.stringify(data.variants) : undefined,
        seo: data.seo ? JSON.stringify(data.seo) : undefined,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

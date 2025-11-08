import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ cart: [] });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const cart = await prisma.cartItem.findMany({
      where: { userId: decoded.userId },
    });
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('[CART GET] ', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { productId, quantity, selectedVariant } = await request.json();
    await prisma.cartItem.create({
      data: {
        userId: decoded.userId,
        productId,
        quantity,
        selectedVariant,
      },
    });
    return NextResponse.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('[CART POST] ', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { productId, quantity, selectedVariant } = await request.json();
    const where: any = { userId: decoded.userId, productId };
    if (selectedVariant) {
      where.selectedVariant = selectedVariant;
    }
    await prisma.cartItem.updateMany({
      where,
      data: { quantity },
    });
    return NextResponse.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('[CART PUT] ', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { productId, selectedVariant } = await request.json();
    const where: any = { userId: decoded.userId, productId };
    if (selectedVariant) {
      where.selectedVariant = selectedVariant;
    }
    await prisma.cartItem.deleteMany({
      where,
    });
    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('[CART DELETE] ', error);
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}

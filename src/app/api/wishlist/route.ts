import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ wishlist: [] });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: decoded.userId },
      select: { productId: true },
    });
    return NextResponse.json({ wishlist: wishlist.map(item => item.productId) });
  } catch (error) {
    console.error('[WISHLIST GET]', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { productId } = await request.json();
    await prisma.wishlist.create({
      data: {
        userId: decoded.userId,
        productId,
      },
    });
    return NextResponse.json({ message: 'Item added to wishlist' });
  } catch (error) {
    console.error('[WISHLIST POST]', error);
    return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { productId } = await request.json();
    await prisma.wishlist.deleteMany({
      where: {
        userId: decoded.userId,
        productId,
      },
    });
    return NextResponse.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('[WISHLIST DELETE]', error);
    return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 });
  }
}

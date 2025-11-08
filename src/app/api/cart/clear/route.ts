import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

  await prisma.cartItem.deleteMany({
    where: { userId: decoded.userId },
  });

  return NextResponse.json({ message: 'Cart cleared' });
}

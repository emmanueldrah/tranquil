import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 200 }); // Return empty array for unauthenticated users
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json([], { status: 200 });
    }
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders || []); // Ensure orders is never null
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}

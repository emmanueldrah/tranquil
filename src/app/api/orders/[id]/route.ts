import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  try {
    await prisma.order.delete({
      where: { id },
    });
    // Return a 204 No Content response on successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}

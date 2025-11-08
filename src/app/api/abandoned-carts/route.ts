import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const list = await prisma.abandonedCart.findMany({ orderBy: { createdAt: 'desc' } });
    const parsed = list.map((l: any) => ({
      ...l,
      items: (() => { try { return JSON.parse(l.items); } catch { return []; } })(),
    }));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('GET /api/abandoned-carts error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const snapshot = {
      id: body.id || `ac_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      items: JSON.stringify(body.items || []),
      total: body.total ?? 0,
      userEmail: body.userEmail ?? null,
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      sentAt: null,
    };

    await prisma.abandonedCart.create({ data: snapshot as any });

    return NextResponse.json({ success: true, id: snapshot.id });
  } catch (err) {
    console.error('Error saving abandoned cart snapshot:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

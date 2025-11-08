import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: { id?: string } - if id provided, send recovery for that snapshot, otherwise send for all unsent
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const toSend = body?.id
      ? await prisma.abandonedCart.findMany({ where: { id: body.id, sentAt: null } })
      : await prisma.abandonedCart.findMany({ where: { sentAt: null } });

    // Mock sending: mark as sent and log payload. Replace with real email provider integration.
    for (const snap of toSend) {
      console.log('Sending recovery email for abandoned cart:', snap.id, 'to', snap.userEmail || 'unknown');
      await prisma.abandonedCart.update({ where: { id: snap.id }, data: { sentAt: new Date() } });
    }

  return NextResponse.json({ success: true, sent: toSend.map((s: any) => s.id) });
  } catch (err) {
    console.error('Error sending recovery emails:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

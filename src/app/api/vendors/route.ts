import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({ orderBy: { joinedDate: 'desc' } });
    const parsed = vendors.map((v: any) => ({
      ...v,
      contactInfo: (() => { try { return JSON.parse(v.contactInfo); } catch { return null; } })(),
    }));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('GET /api/vendors error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

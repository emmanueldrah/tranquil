import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    const parsed = users.map((u: any) => ({
      id: u.id,
      name: u.name || u.email,
      email: u.email,
      phone: u.phone || undefined,
      role: u.role || 'customer',
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : '',
    }));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('GET /api/users error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

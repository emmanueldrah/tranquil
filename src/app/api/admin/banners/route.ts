import { NextRequest, NextResponse } from 'next/server';
import { getAllBanners, createBanner } from '@/data';

export async function GET() {
  try {
    const banners = await getAllBanners();
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, link, isActive, position } = body;

    if (!title || !image) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    const banner = await createBanner({
      title,
      description,
      image,
      link,
      isActive: isActive ?? true,
      position: position ?? 0,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}

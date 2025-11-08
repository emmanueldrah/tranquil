import { NextRequest, NextResponse } from 'next/server';
import { getAllVendors, createVendor } from '@/data';

export async function GET() {
  try {
    const vendors = await getAllVendors();
    return NextResponse.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, logo, rating, contactInfo, website } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const vendor = await createVendor({
      name,
      description: description || '',
      logo: logo || '',
      rating: rating || 0,
      contactInfo: contactInfo || { phone: '', email: '', address: '' },
      website,
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}

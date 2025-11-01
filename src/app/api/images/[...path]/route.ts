import fs from 'fs/promises';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path: pathSegments } = await params;
    const parts = pathSegments || [];
    const imagesRoot = path.join(process.cwd(), 'images');
    const filePath = parts.reduce((acc, part) => path.join(acc, part), imagesRoot);

    // Prevent path traversal
    if (!filePath.startsWith(imagesRoot)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    return new NextResponse('Not Found', { status: 404 });
  }
}

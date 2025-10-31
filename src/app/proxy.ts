import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if user is authenticated
  const user = request.cookies.get('currentUser');
  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith('/admin')) {
    if (!user || !JSON.parse(user.value)?.role?.includes('admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect authenticated routes
  if (path.startsWith('/account')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Update the matcher to use a more specific pattern
export const config = {
  // Protected paths
  matcher: [
    '/admin/:path*',
    '/account/:path*',
  ]
};
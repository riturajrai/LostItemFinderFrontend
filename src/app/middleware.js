import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;
    console.log(`[${new Date().toISOString()}] Middleware - Path: ${path}`);
    console.log(`[${new Date().toISOString()}] Middleware - Cookies:`, request.cookies.getAll());
    console.log(`[${new Date().toISOString()}] Middleware - Token:`, token ? 'Present' : 'Absent');

    const protectedRoutes = ['/dashboard/:path*', '/profile', '/my-qr-tags', '/premium-services', '/explore-local'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      route.includes(':path*')
        ? path.startsWith(route.replace('/:path*', ''))
        : path === route
    );

    if (isProtectedRoute) {
      console.log(`[${new Date().toISOString()}] Middleware - Accessing protected route: ${path}`);
    }

    console.log(`[${new Date().toISOString()}] Middleware - Allowing access to ${path}`);
    return NextResponse.next();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Middleware error:`, error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/my-qr-tags', '/premium-services', '/explore-local'],
};
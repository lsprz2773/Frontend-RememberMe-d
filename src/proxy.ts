import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Las rutas de autenticación son públicas
  if (pathname.startsWith('/api/auth/')) return;

  // Todas las demás rutas /api/* requieren token
  if (pathname.startsWith('/api/')) {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
  }
}

export const config = {
  matcher: '/api/:path*',
};

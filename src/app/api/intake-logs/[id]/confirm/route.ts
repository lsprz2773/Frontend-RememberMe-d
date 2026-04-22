import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    const { id } = await context.params;
    const body = await request.json();
    const data = await apiFetch<unknown>(`/api/intake-logs/${id}/confirm`, {
      method: 'PATCH',
      body,
      token,
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al confirmar toma' }, { status: 500 });
  }
}

import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';
import type { ApiMedication } from '@/types/api';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    const { id } = await context.params;
    const data = await apiFetch<ApiMedication>(`/api/medications/${id}`, { token });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al obtener medicamento' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    const { id } = await context.params;
    const body = await request.json();
    const data = await apiFetch<ApiMedication>(`/api/medications/${id}`, {
      method: 'PATCH',
      body,
      token,
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al actualizar medicamento' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    const { id } = await context.params;
    await apiFetch<null>(`/api/medications/${id}`, { method: 'DELETE', token });
    return new Response(null, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al eliminar medicamento' }, { status: 500 });
  }
}

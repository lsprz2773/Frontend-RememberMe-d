import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';
import type { ApiDoctorPatientLink } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    const data = await apiFetch<ApiDoctorPatientLink>('/api/links/generate', {
      method: 'POST',
      token,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al generar código de vinculación' }, { status: 500 });
  }
}

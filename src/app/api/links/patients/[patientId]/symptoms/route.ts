import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';
import type { ApiSymptom } from '@/types/api';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ patientId: string }> }
) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    const { patientId } = await context.params;
    const data = await apiFetch<ApiSymptom[]>(
      `/api/links/patients/${patientId}/symptoms`,
      { token }
    );
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al obtener síntomas del paciente' }, { status: 500 });
  }
}

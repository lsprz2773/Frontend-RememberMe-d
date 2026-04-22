const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:3000';

interface FetchOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Realiza una petición HTTP al backend Express.
 * Solo debe llamarse desde API Routes de Next.js (server-side).
 */
export async function apiFetch<T>(
  path: string,
  { method = 'GET', body, token }: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null as unknown as T;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const d = data as { message?: string; error?: string };
    const message = d.message ?? d.error ?? res.statusText;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function getTokens() {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };
  return {
    accessToken: localStorage.getItem('cea_access_token'),
    refreshToken: localStorage.getItem('cea_refresh_token'),
  };
}

function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('cea_access_token', accessToken);
  localStorage.setItem('cea_refresh_token', refreshToken);
}

function clearTokens() {
  localStorage.removeItem('cea_access_token');
  localStorage.removeItem('cea_refresh_token');
}

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = getTokens();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) { clearTokens(); return null; }
    const json: { success: boolean; data?: { accessToken: string; refreshToken: string } } = await res.json();
    if (json.success && json.data) {
      setTokens(json.data.accessToken, json.data.refreshToken);
      return json.data.accessToken;
    }
    return null;
  } catch { clearTokens(); return null; }
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: { code: string; message: string } }> {
  const { accessToken } = getTokens();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  let res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && accessToken) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_URL}${path}`, { ...options, headers });
    }
  }

  const json: { success: boolean; data?: T; error?: { code: string; message: string } } = await res.json();
  if (!res.ok) {
    return {
      success: false,
      error: json.error || { code: 'UNKNOWN', message: 'An error occurred' },
    };
  }
  return json;
}

export { setTokens, clearTokens, getTokens };

export async function uploadFile<T = { key: string; url: string; contentType: string; size: number }>(
  key: string,
  file: Blob
): Promise<{ success: boolean; data?: T; error?: { code: string; message: string } }> {
  const { accessToken } = getTokens();
  const headers: Record<string, string> = {};
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  let res = await fetch(`${API_URL}/v1/uploads/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers,
    body: file,
  });

  if (res.status === 401 && accessToken) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_URL}/v1/uploads/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers,
        body: file,
      });
    }
  }

  const json: { success: boolean; data?: T; error?: { code: string; message: string } } = await res.json();
  if (!res.ok) {
    return {
      success: false,
      error: json.error || { code: 'UNKNOWN', message: 'Upload failed' },
    };
  }
  return json;
}

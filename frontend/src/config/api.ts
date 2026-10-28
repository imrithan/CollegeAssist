const rawBase = import.meta.env.VITE_API_URL || '';
export const API_BASE = rawBase.replace(/\/$/, '');

export const apiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!API_BASE) {
    return cleanEndpoint;
  }
  return `${API_BASE}${cleanEndpoint}`;
};

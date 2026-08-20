// API Client Bridge for Render Backend with localStorage fallback
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`[API Client] Endpoint /api/${endpoint} unreachable or offline, utilizing local fallback.`, error.message);
    return null;
  }
};

export const saveToAPI = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.warn(`[API Client] Sync to /api/${endpoint} failed, relying on local event broadcast.`, error.message);
    return null;
  }
};

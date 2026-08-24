// API Client Bridge for Render/Local Backend with MongoDB Atlas Multi-Device Live Sync

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  return 'https://optical-backend-duat.onrender.com';
};

export const API_BASE = getApiBase();

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
    console.warn(`[API Client] Endpoint /api/${endpoint} offline, using cached fallback.`, error.message);
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
    console.warn(`[API Client] Sync to /api/${endpoint} failed, utilizing local fallback.`, error.message);
    return null;
  }
};

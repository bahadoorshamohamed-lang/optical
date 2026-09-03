// Live Cloud API Bridge connected to MongoDB Atlas for Real-Time Multi-Device Sync

const PRIMARY_CLOUD_API = import.meta.env.VITE_API_URL || 'https://optical-vykh.onrender.com';
const LOCAL_DEV_API = 'http://localhost:5000';

export const API_BASE = PRIMARY_CLOUD_API;

/**
 * Fetch latest data from Live Cloud Backend MongoDB Atlas.
 * Falls back to local dev server or local cache if offline.
 */
export const fetchFromAPI = async (endpoint, options = {}) => {
  // 1. Try Primary Live Cloud Endpoint (2.5s Timeout for Lightning Fast Load)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const cloudRes = await fetch(`${PRIMARY_CLOUD_API}/api/${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);
    if (cloudRes.ok) {
      const data = await cloudRes.json();
      if (data) return data;
    }
  } catch (err) {
    // Instant fallback to local data if cloud API times out or is offline
  }

  // 2. Try Local Dev Server if running on localhost
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const localRes = await fetch(`${LOCAL_DEV_API}/api/${endpoint}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });
      if (localRes.ok) return await localRes.json();
    } catch (e) {
      // Local dev server offline
    }
  }

  return null;
};

/**
 * Save data to Live Cloud Backend MongoDB Atlas so all devices globally update.
 * Also syncs to local dev server if available.
 */
export const saveToAPI = async (endpoint, data) => {
  let result = null;

  // 1. Always Save to Live Cloud Database (MongoDB Atlas) with 4s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const cloudRes = await fetch(`${PRIMARY_CLOUD_API}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (cloudRes.ok) {
      result = await cloudRes.json();
    }
  } catch (err) {
    console.warn(`[Cloud Sync] Save to Cloud API /api/${endpoint} failed:`, err.message);
  }

  // 2. Also Save to Local Dev Server if running
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      await fetch(`${LOCAL_DEV_API}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      // ignore local dev server errors
    }
  }

  return result;
};

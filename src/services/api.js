// Live Cloud API Bridge connected to MongoDB Atlas for Real-Time Multi-Device Sync

const PRIMARY_CLOUD_API = import.meta.env.VITE_API_URL || 'https://optical-vykh.onrender.com';
const LOCAL_DEV_API = 'http://localhost:5000';

export const API_BASE = PRIMARY_CLOUD_API;

/**
 * Fetch latest data from Live Cloud Backend MongoDB Atlas.
 * Includes cold-start wake-up tolerance (12s timeout) + retry logic.
 */
export const fetchFromAPI = async (endpoint, options = {}, retries = 2) => {
  // 1. Try Primary Live Cloud Endpoint (12s Timeout for Render Cold Start Wake-up)
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutMs = attempt === 0 ? 10000 : 15000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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
      // If abort/timeout happened and retries remain, wait 1.5s then retry
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
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

  // 1. Always Save to Live Cloud Database (MongoDB Atlas) with 10s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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

// Live Central Cloud API Bridge connected to MongoDB Atlas for Universal Multi-Device Sync

const PRIMARY_CLOUD_API = import.meta.env.VITE_API_URL || 'https://optical-vykh.onrender.com';

export const API_BASE = PRIMARY_CLOUD_API;

/**
 * Fetch latest product & catalogue data from Central Cloud Backend (MongoDB Atlas).
 * Every device (Wi-Fi, 4G, 5G, Mobile, Laptop) queries the exact same cloud database.
 */
export const fetchFromAPI = async (endpoint, options = {}, retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      // Render free tier cold start can take up to 30-35s on idle awake
      const timeoutMs = attempt === 0 ? 35000 : 20000;
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
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  return null;
};

/**
 * Save product & catalogue changes directly to Central Cloud Backend (MongoDB Atlas).
 * All updates are written to the central cloud database and broadcast globally.
 */
export const saveToAPI = async (endpoint, data, retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutMs = attempt === 0 ? 35000 : 20000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const cloudRes = await fetch(`${PRIMARY_CLOUD_API}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (cloudRes.ok) {
        const result = await cloudRes.json();
        if (result) return result;
      }
    } catch (err) {
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  return null;
};



import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Site Configuration for TopBar and Footer Sections
export const DEFAULT_TOPBAR_DATA = {
  phone: '9047320092',
  address: 'Opposite to Government Hospital, Main Road, Omalur',
  cityPincode: 'Salem, Tamil Nadu - 636455',
  tagline: 'Complete Ophthalmic Lens Fitting & Eye Care',
  workingHours: 'Mon - Sat: 9:30 AM - 9:00 PM',
  email: 'visioncareomalur@gmail.com',
  isTopBarVisible: true,
};

export const DEFAULT_FOOTER_DATA = {
  aboutText: 'Providing precision eye care, high-grade anti-glare & blue cut lenses, and curated spectacle frames for clear vision and everyday comfort.',
  copyrightText: '© 2026 Vision Care Opticals. All Rights Reserved.',
  tagline: 'Designed for Clear Vision & Optical Excellence',
  addressLine: 'Opposite to Government Hospital, Main Road, Omalur, Salem - 636455',
  phone: '9047320092',
  email: 'visioncareomalur@gmail.com',
};

const TOPBAR_KEY = 'vision_care_topbar_config_v1';
const FOOTER_KEY = 'vision_care_footer_config_v1';

// --- TOPBAR STORAGE HELPERS ---
export const getStoredTopBarData = () => {
  try {
    const saved = localStorage.getItem(TOPBAR_KEY);
    if (saved) {
      return { ...DEFAULT_TOPBAR_DATA, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error loading top bar data:', error);
  }
  return DEFAULT_TOPBAR_DATA;
};

export const syncTopBarDataWithAPI = async () => {
  const remoteData = await fetchFromAPI('topbar');
  if (remoteData && remoteData.phone) {
    try {
      const merged = { ...DEFAULT_TOPBAR_DATA, ...remoteData };
      localStorage.setItem(TOPBAR_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('topbar-updated', { detail: merged }));
      return merged;
    } catch (e) {
      console.error(e);
    }
  }
  return getStoredTopBarData();
};

export const saveTopBarData = (data) => {
  try {
    localStorage.setItem(TOPBAR_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('topbar-updated', { detail: data }));
    saveToAPI('topbar', data);
  } catch (error) {
    console.error('Error saving top bar data:', error);
  }
};

// --- FOOTER STORAGE HELPERS ---
export const getStoredFooterData = () => {
  try {
    const saved = localStorage.getItem(FOOTER_KEY);
    if (saved) {
      return { ...DEFAULT_FOOTER_DATA, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error loading footer data:', error);
  }
  return DEFAULT_FOOTER_DATA;
};

export const syncFooterDataWithAPI = async () => {
  const remoteData = await fetchFromAPI('footer');
  if (remoteData && remoteData.phone) {
    try {
      const merged = { ...DEFAULT_FOOTER_DATA, ...remoteData };
      localStorage.setItem(FOOTER_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('footer-updated', { detail: merged }));
      return merged;
    } catch (e) {
      console.error(e);
    }
  }
  return getStoredFooterData();
};

export const saveFooterData = (data) => {
  try {
    localStorage.setItem(FOOTER_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('footer-updated', { detail: data }));
    saveToAPI('footer', data);
  } catch (error) {
    console.error('Error saving footer data:', error);
  }
};

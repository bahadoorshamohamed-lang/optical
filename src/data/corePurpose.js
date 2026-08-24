import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Core Purpose Focus Areas for Vision Care Opticals
export const DEFAULT_CORE_PURPOSE = [
  {
    id: 'vision',
    label: 'Vision',
    tagline: 'Ophthalmic Clarity & HEV Defense',
    description: 'We engineer optical lenses that protect corneal health and absorb harmful 400nm-450nm digital blue ray flickers, giving software engineers and students crystalline vision all day.',
    bgImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'style',
    label: 'Style',
    tagline: 'Curated Architectural Frames',
    description: 'Eyewear is the first thing the world notices about you. Our collections curate classic executive tortoise, minimalist wireframes, and high-fashion sunwear to elevate your visual identity.',
    bgImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'comfort',
    label: 'Comfort',
    tagline: 'Zero-Pressure Ergonomic Fit',
    description: 'Lightweight beta-titanium temple flex points and contoured nose pads distribute frame weight evenly, eliminating temple pressure and nose pinches completely.',
    bgImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  }
];

const CORE_PURPOSE_KEY = 'vision_care_core_purpose_v1';

export const getStoredCorePurpose = () => {
  try {
    const saved = localStorage.getItem(CORE_PURPOSE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading stored core purpose items:', error);
  }
  
  try {
    localStorage.setItem(CORE_PURPOSE_KEY, JSON.stringify(DEFAULT_CORE_PURPOSE));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_CORE_PURPOSE;
};

export const syncCorePurposeWithAPI = async () => {
  const remoteData = await fetchFromAPI('purpose');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(CORE_PURPOSE_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('core-purpose-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredCorePurpose();
};

export const saveCorePurpose = (purposeItems) => {
  try {
    localStorage.setItem(CORE_PURPOSE_KEY, JSON.stringify(purposeItems));
    window.dispatchEvent(new CustomEvent('core-purpose-updated', { detail: purposeItems }));
    saveToAPI('purpose', purposeItems);
  } catch (error) {
    console.error('Error saving core purpose items:', error);
  }
};

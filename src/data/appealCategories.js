import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Eyewear With Mass Appeal categories for Vision Care Opticals
export const DEFAULT_APPEAL_CATEGORIES = [
  {
    id: 'cat-eyeglasses',
    label: 'Eyeglasses',
    subtitle: 'Trendy, Durable & Lightweight',
    targetTab: 'eyeglasses',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'cat-lenses',
    label: 'Lenses',
    subtitle: 'Anti-Glare & Blue Light Protection',
    targetTab: 'lenses',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'cat-kids',
    label: 'Kids',
    subtitle: 'Flexible, Safe & Scratch Resistant',
    targetTab: 'kids',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'cat-sunglasses',
    label: 'Sunglasses',
    subtitle: 'UV Protection & Polarization',
    targetTab: 'sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  }
];

const LOCAL_STORAGE_KEY = 'vision_care_appeal_categories_v2';

export const getStoredAppealCategories = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading appeal categories:', error);
  }
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_APPEAL_CATEGORIES));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_APPEAL_CATEGORIES;
};

export const syncAppealCategoriesWithAPI = async () => {
  const remoteData = await fetchFromAPI('appeal');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('appeal-categories-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredAppealCategories();
};

export const saveAppealCategories = (categories) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new CustomEvent('appeal-categories-updated', { detail: categories }));
    saveToAPI('appeal', categories);
  } catch (error) {
    console.error('Error saving appeal categories:', error);
  }
};

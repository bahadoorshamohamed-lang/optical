import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Image-Only Open Posters for Vision Care Opticals
export const DEFAULT_POSTERS = [
  {
    id: 'poster-01',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
    validUntil: '2026-12-31',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'poster-02',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    validUntil: '2026-12-31',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'poster-03',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
    validUntil: '2026-12-31',
    isActive: true,
    createdAt: '2026-08-20'
  }
];

const LOCAL_STORAGE_KEY = 'vision_care_open_posters_v2';

export const getStoredPosters = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading posters from localStorage:', error);
  }
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_POSTERS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_POSTERS;
};

export const syncPostersWithAPI = async () => {
  const remoteData = await fetchFromAPI('posters');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('posters-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredPosters();
};

export const savePosters = (posters) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posters));
    window.dispatchEvent(new CustomEvent('posters-updated', { detail: posters }));
    saveToAPI('posters', posters);
  } catch (error) {
    console.error('Error saving posters:', error);
  }
};

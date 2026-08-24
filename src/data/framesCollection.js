import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Frames Collection for "Our Frames Collection" Marquee Track in About Page
export const DEFAULT_FRAMES_COLLECTION = [
  {
    id: 'frame-1',
    name: 'Classic Black Bio-Acetate',
    category: 'PREMIUM EXECUTIVE',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    staggerClass: '-translate-y-6 sm:-translate-y-10',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'frame-2',
    name: 'Gold Wire Geometric Frame',
    category: 'MINIMALIST METAL',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    staggerClass: 'translate-y-8 sm:translate-y-12',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'frame-3',
    name: 'Vintage Amber Tortoise',
    category: 'HERITAGE SERIES',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    staggerClass: '-translate-y-12 sm:-translate-y-16',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'frame-4',
    name: 'Frameless Beta-Titanium',
    category: 'ULTRA-LIGHT RIMLESS',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    staggerClass: 'translate-y-6 sm:translate-y-8',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'frame-5',
    name: 'Dark Charcoal Aviator',
    category: 'POLARIZED SUNGLASS',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    staggerClass: '-translate-y-8 sm:-translate-y-12',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'frame-6',
    name: 'Rubberized Flex TR90',
    category: 'JUNIOR KIDS OPTICS',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    staggerClass: 'translate-y-10 sm:translate-y-14',
    isActive: true,
    createdAt: '2026-08-20'
  }
];

const FRAMES_KEY = 'vision_care_marquee_frames_v1';

export const getStoredFramesCollection = () => {
  try {
    const saved = localStorage.getItem(FRAMES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading stored marquee frames:', error);
  }
  
  try {
    localStorage.setItem(FRAMES_KEY, JSON.stringify(DEFAULT_FRAMES_COLLECTION));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_FRAMES_COLLECTION;
};

export const syncFramesCollectionWithAPI = async () => {
  const remoteData = await fetchFromAPI('frames');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(FRAMES_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('frames-collection-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredFramesCollection();
};

export const saveFramesCollection = (frames) => {
  try {
    localStorage.setItem(FRAMES_KEY, JSON.stringify(frames));
    window.dispatchEvent(new CustomEvent('frames-collection-updated', { detail: frames }));
    saveToAPI('frames', frames);
  } catch (error) {
    console.error('Error saving marquee frames:', error);
  }
};

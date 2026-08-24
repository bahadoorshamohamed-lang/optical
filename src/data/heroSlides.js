import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Hero Background Images for Vision Care Opticals
export const DEFAULT_HERO_SLIDES = [
  {
    id: 'hero-01',
    url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Optical Frames & Eyewear',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'hero-02',
    url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1920&q=80',
    title: 'Precision Blue Cut & AR Lenses',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'hero-03',
    url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1920&q=80',
    title: 'Advanced Eye Care & Lens Solutions',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'hero-04',
    url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1920&q=80',
    title: 'Stylish Handcrafted Acetate Frames',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'hero-05',
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1920&q=80',
    title: 'Executive & Classic Optical Eyewear',
    isActive: true,
    createdAt: '2026-08-20'
  }
];

const LOCAL_STORAGE_KEY = 'vision_care_hero_slides_v1';

export const getStoredHeroSlides = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading hero slides from localStorage:', error);
  }
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_HERO_SLIDES));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_HERO_SLIDES;
};

export const syncHeroSlidesWithAPI = async () => {
  const remoteData = await fetchFromAPI('hero');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('hero-slides-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredHeroSlides();
};

export const saveHeroSlides = (slides) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent('hero-slides-updated', { detail: slides }));
    saveToAPI('hero', slides);
  } catch (error) {
    console.error('Error saving hero slides:', error);
  }
};

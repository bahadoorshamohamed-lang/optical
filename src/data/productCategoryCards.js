import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Product Category Banner Cards
export const DEFAULT_CATEGORY_CARDS = [
  { 
    id: 'eye-solutions', 
    label: 'Eye Solutions', 
    tagline: 'CLINICALLY FORMULATED CARE',
    description: 'Disinfecting drops, cleaning formulas, & hydration kits for lenses & eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-cyan-500/90',
    targetTab: 'eye-solutions',
    isActive: true
  },
  { 
    id: 'lenses', 
    label: 'Lenses Collection', 
    tagline: 'HIGH-PRECISION OPTICS',
    description: 'Blue cut, anti-glare, single vision, & photochromic transition lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-emerald-500/90',
    targetTab: 'lenses',
    isActive: true
  },
  { 
    id: 'frames', 
    label: 'Frames Collection', 
    tagline: 'ERGONOMIC EYEWEAR STYLES',
    description: 'Full rim, half rim, rimless titanium, Italian acetate & flexible kids frames.',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-amber-500/90',
    targetTab: 'frames',
    isActive: true
  },
  { 
    id: 'sunglasses', 
    label: 'Sunglasses', 
    tagline: 'UV400 & POLARIZED SUN WEAR',
    description: 'Aviators, retro round, wayfarers & UV protected outdoor sunglasses for Men, Women & Kids.',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-rose-500/90',
    targetTab: 'sunglasses',
    isActive: true
  }
];

const LOCAL_STORAGE_KEY = 'vision_care_category_cards_v1';

export const getStoredCategoryCards = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading stored category cards:', error);
  }
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORY_CARDS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_CATEGORY_CARDS;
};

export const syncCategoryCardsWithAPI = async () => {
  const remoteData = await fetchFromAPI('category-cards');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('category-cards-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredCategoryCards();
};

export const saveCategoryCards = (cards) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
    window.dispatchEvent(new CustomEvent('category-cards-updated', { detail: cards }));
    saveToAPI('category-cards', cards);
  } catch (error) {
    console.error('Error saving category cards:', error);
  }
};

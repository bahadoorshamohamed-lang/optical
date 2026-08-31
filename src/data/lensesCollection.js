import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Lenses Collection Data for Vision Care Opticals
export const DEFAULT_LENSES_COLLECTION = [
  {
    id: 'lens-item-01',
    name: 'Single Vision Precision Lenses',
    lensType: 'SINGLE VISION',
    coating: 'Scratch-Resistant & Hard Coat',
    indexRate: '1.56 Mid-Index / 1.61 High-Index',
    description: 'Custom ground single focal point lenses designed for accurate distance vision or close-up reading correction with edge-to-edge clarity.',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'lens-item-02',
    name: 'Blue Cut Digital Shield Lenses',
    lensType: 'BLUE LIGHT DEFENSE',
    coating: 'HEV 420nm Blue Ray Filter + Anti-Reflective',
    indexRate: '1.61 High-Index / 1.67 Ultra-Thin',
    description: 'Blocks harmful digital blue light rays emitted by monitors, laptops, and smartphones to eliminate screen eye strain and headaches.',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'lens-item-03',
    name: 'Progressive No-Line Multifocal Lenses',
    lensType: 'PROGRESSIVE MULTIFOCAL',
    coating: 'Seamless Gradient Vision + Hydrophobic Coat',
    indexRate: '1.67 Premium Thin / 1.74 Ultra-Slim',
    description: 'Smooth gradient progression between distance, intermediate digital screen, and near reading zones without visible bifocal lines.',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'lens-item-04',
    name: 'Photochromic Sun-Adapt Transition Lenses',
    lensType: 'TRANSITION / SUN-ADAPT',
    coating: 'Fast UV Transition + Crizal Sapphire AR',
    indexRate: '1.60 High-Index Shatterproof',
    description: 'Clear indoors and rapidly darkens to protective sunglass tint outdoors upon UV ray exposure for ultimate 24/7 visual versatility.',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'lens-item-05',
    name: 'Anti-Glare Night Drive Lenses',
    lensType: 'NIGHT DRIVE / ANTI-GLARE',
    coating: 'Yellow Amber Contrast Tint + Dual AR Shield',
    indexRate: '1.56 High-Clarity Polycarbonate',
    description: 'Eliminates blinding halogen headlight glare and reflections during night driving, enhancing road safety and depth perception.',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  }
];

const LENSES_KEY = 'vision_care_lenses_collection_v1';

export const getStoredLensesCollection = () => {
  try {
    const saved = localStorage.getItem(LENSES_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading stored lenses collection:', error);
  }
  
  try {
    localStorage.setItem(LENSES_KEY, JSON.stringify(DEFAULT_LENSES_COLLECTION));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_LENSES_COLLECTION;
};

export const syncLensesCollectionWithAPI = async () => {
  const remoteData = await fetchFromAPI('lenses');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(LENSES_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('lenses-collection-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredLensesCollection();
};

export const saveLensesCollection = (lenses) => {
  try {
    localStorage.setItem(LENSES_KEY, JSON.stringify(lenses));
    window.dispatchEvent(new CustomEvent('lenses-collection-updated', { detail: lenses }));
    saveToAPI('lenses', lenses);
  } catch (error) {
    console.error('Error saving lenses collection:', error);
  }
};

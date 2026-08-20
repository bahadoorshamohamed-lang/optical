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

// Helper function to get posters from localStorage or fallback to default
export const getStoredPosters = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading posters from localStorage:', error);
  }
  
  // Store default posters if none exist
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_POSTERS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_POSTERS;
};

// Helper function to save posters array to localStorage
export const savePosters = (posters) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posters));
    // Trigger custom window event so UI updates live everywhere
    window.dispatchEvent(new CustomEvent('posters-updated', { detail: posters }));
  } catch (error) {
    console.error('Error saving posters to localStorage:', error);
  }
};

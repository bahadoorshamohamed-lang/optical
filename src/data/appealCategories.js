// Default Eyewear With Mass Appeal categories for Vision Care Opticals
export const DEFAULT_APPEAL_CATEGORIES = [
  {
    id: 'appeal-women',
    label: 'Women',
    subtitle: 'Chic & Elegant Frames',
    targetTab: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'appeal-men',
    label: 'Men',
    subtitle: 'Executive & Classic',
    targetTab: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'appeal-kids',
    label: 'Kids',
    subtitle: 'Flexible & Breakproof',
    targetTab: 'kids',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'appeal-sunglasses',
    label: 'Sunglasses',
    subtitle: 'UV400 Polarized',
    targetTab: 'sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'appeal-clip-on',
    label: 'Clip-on',
    subtitle: '2-in-1 Versatile Optics',
    targetTab: 'clipon',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80',
    isActive: true,
    createdAt: '2026-08-20'
  }
];

const LOCAL_STORAGE_KEY = 'vision_care_appeal_categories_v1';

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

export const saveAppealCategories = (categories) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new CustomEvent('appeal-categories-updated', { detail: categories }));
  } catch (error) {
    console.error('Error saving appeal categories:', error);
  }
};

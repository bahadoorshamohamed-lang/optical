import { fetchFromAPI, saveToAPI } from '../services/api';

// Default Arched 360 Product Showcase Items for Vision Care Opticals
export const DEFAULT_SHOWCASE_ITEMS = [
  {
    id: 'showcase-01',
    code: '01 / 06',
    title: 'Handcrafted Acetate Eyewear',
    category: 'PREMIUM FRAMES',
    descriptionLines: [
      'Handcrafted bio-cellulose acetate frame engineered for superior durability and shape retention.',
      'Features 5-barrel German stainless steel hinges for smooth, long-lasting temple movement.',
      'Ergonomically contoured nose bridge distributes frame weight evenly across all facial shapes.',
      'Rich deep tortoise finish with polished gloss texture suited for daily executive wear.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'showcase-02',
    code: '02 / 06',
    title: 'Blue Cut Digital Filter Lenses',
    category: 'LENSES COLLECTION',
    descriptionLines: [
      'Advanced blue ray absorption technology shielding your eyes from HEV light (400nm - 450nm).',
      'Reduces digital eye fatigue, headaches, and sleep disruption during extended screen time.',
      'Includes multi-layer anti-reflective coating eliminating monitor flickers and screen glares.',
      'Prescribes crystal-clear optics essential for software engineers, students, and desk professionals.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'showcase-03',
    code: '03 / 06',
    title: 'Heritage Classic Frames',
    category: 'CLASSIC FRAMES',
    descriptionLines: [
      'Timeless unisex rectangular framing offering versatile elegance for every occasion.',
      'Constructed with lightweight composite materials providing effortless all-day wearing comfort.',
      'Compatible with single vision, progressive multi-focal, and reading optical power fittings.',
      'Proven structural reliability backed by Abdul Wahab B.Sc. Optom. vision fitting standards.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'showcase-04',
    code: '04 / 06',
    title: 'Ultra-Minimalist Rimless Optics',
    category: 'RIMLESS FRAMES',
    descriptionLines: [
      'Featherlight frameless optics weighing less than 10 grams for an almost invisible appearance.',
      'Flexible beta-titanium temples absorb accidental bends while maintaining custom temple tension.',
      'Provides an unobstructed panoramic visual field without heavy outer rim boundaries.',
      'Custom drilled and fitted with high-impact polycarbonate optical lens materials.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'showcase-05',
    code: '05 / 06',
    title: 'Polarized Designer Sunglasses',
    category: 'SUNGLASSES',
    descriptionLines: [
      '100% UVA and UVB total solar defense shielding corneal and retinal tissues from harsh rays.',
      'Precision polarized film eliminates blinded road reflections and daytime glare artifacts.',
      'Scratch-resistant optical coating ensures long-lasting clarity during outdoor activities.',
      'Stylish dark charcoal gradient tint styled for driving, travel, and outdoor comfort.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    id: 'showcase-06',
    code: '06 / 06',
    title: 'Flexible Junior Kids Eyewear',
    category: 'KIDS FRAMES',
    descriptionLines: [
      'Shatterproof TR90 rubberized polymer frames designed specifically for active children.',
      '180-degree flexible temple hinges flex without breaking or losing original structural alignment.',
      '100% non-toxic, hypoallergenic, and free from sharp metal screws or dangerous hard edges.',
      'Lightweight ergonomic fit ensuring glasses stay secure during school and outdoor play.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
];

const SHOWCASE_360_KEY = 'vision_care_showcase_360_v1';

export const getStoredShowcase360 = () => {
  try {
    const saved = localStorage.getItem(SHOWCASE_360_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading stored showcase 360 items:', error);
  }
  
  try {
    localStorage.setItem(SHOWCASE_360_KEY, JSON.stringify(DEFAULT_SHOWCASE_ITEMS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_SHOWCASE_ITEMS;
};

export const syncShowcase360WithAPI = async () => {
  const remoteData = await fetchFromAPI('showcase360');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      localStorage.setItem(SHOWCASE_360_KEY, JSON.stringify(remoteData));
      window.dispatchEvent(new CustomEvent('showcase360-updated', { detail: remoteData }));
    } catch (e) {
      console.error(e);
    }
    return remoteData;
  }
  return getStoredShowcase360();
};

export const saveShowcase360 = (showcaseItems) => {
  try {
    localStorage.setItem(SHOWCASE_360_KEY, JSON.stringify(showcaseItems));
    window.dispatchEvent(new CustomEvent('showcase360-updated', { detail: showcaseItems }));
    saveToAPI('showcase360', showcaseItems);
  } catch (error) {
    console.error('Error saving showcase 360 items:', error);
  }
};

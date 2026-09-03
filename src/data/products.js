import { fetchFromAPI, saveToAPI } from '../services/api';

export const DEFAULT_PRODUCTS = [];

export const PRODUCTS_DATA = DEFAULT_PRODUCTS;

export const BUSINESS_INFO = {
  name: "ABDUL WAHAB B.Sc. OPTOM.",
  profession: "Optometrist",
  tagline: "Clear Vision. Better Life.",
  subtitle: "Quality eye-care solutions, lenses and stylish frames for your everyday vision.",
  phone: "8110050501",
  email: "abdulwahaboptometrist@gmail.com",
  addressLine1: "No. 814 MIG, Neithal Street,",
  addressLine2: "New Housing Unit,",
  cityStatePincode: "Thanjavur - 613005",
  mapQuery: "No.+814+MIG,+Neithal+Street,+New+Housing+Unit,+Thanjavur+-+613005"
};

const PRODUCTS_KEY = 'vision_care_products_v10';

export const getStoredProducts = () => {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Filter out legacy dummy products (e.g. drive-prod-* or dummy unsplash images)
        const cleanAdminProducts = parsed.filter(item => {
          if (!item || typeof item !== 'object') return false;
          if (item.id && typeof item.id === 'string' && item.id.startsWith('drive-prod-')) return false;
          if (item.imageUrl && typeof item.imageUrl === 'string' && item.imageUrl.includes('images.unsplash.com')) return false;
          return true;
        });
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(cleanAdminProducts));
        return cleanAdminProducts;
      }
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
  
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const syncProductsWithAPI = async () => {
  const remoteData = await fetchFromAPI('products');
  if (remoteData && Array.isArray(remoteData)) {
    const cleanList = remoteData
      .filter(item => {
        if (!item || typeof item !== 'object') return false;
        if (item.id && typeof item.id === 'string' && item.id.startsWith('drive-prod-')) return false;
        if (item.imageUrl && typeof item.imageUrl === 'string' && item.imageUrl.includes('images.unsplash.com')) return false;
        return true;
      })
      .map(item => {
        const { _id, __v, ...rest } = item;
        return rest;
      });

    const currentSaved = localStorage.getItem(PRODUCTS_KEY);
    const newJson = JSON.stringify(cleanList);

    if (currentSaved !== newJson) {
      try {
        localStorage.setItem(PRODUCTS_KEY, newJson);
        window.dispatchEvent(new CustomEvent('products-updated', { detail: cleanList }));
      } catch (e) {
        console.error('Error writing products to localStorage:', e);
      }
    }
    return cleanList;
  }
  
  // If remote database is offline, fallback to local stored products
  const stored = getStoredProducts();
  return stored || [];
};

export const saveProducts = async (products) => {
  const rawList = Array.isArray(products) ? products : [];
  const cleanList = rawList.map(item => {
    if (!item || typeof item !== 'object') return item;
    const { _id, __v, ...rest } = item;
    return rest;
  });

  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(cleanList));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }

  window.dispatchEvent(new CustomEvent('products-updated', { detail: cleanList }));
  
  const cloudResult = await saveToAPI('products', cleanList);
  return cloudResult ? cleanList : cleanList;
};

export const resetProductsToDefault = async () => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
  } catch (e) {
    console.error(e);
  }
  window.dispatchEvent(new CustomEvent('products-updated', { detail: [] }));
  await saveToAPI('products', []);
  return [];
};

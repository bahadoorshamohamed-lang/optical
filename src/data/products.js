import { fetchFromAPI, saveToAPI } from '../services/api';

export const DEFAULT_PRODUCTS = [
  // ================= EYE SOLUTIONS =================
  {
    id: 'eye-sol-01',
    name: 'Advanced Lens Cleaning Solution',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    tags: ['eye-solutions', 'care', 'women', 'men'],
    shortDescription: 'Gentle, streak-free cleaning formula tailored for multi-coated optical spectacle lenses and anti-reflective coatings.',
    fullDescription: 'Our Advanced Lens Cleaning Solution is specially formulated by optical specialists to gently remove dust, smudges, and fingerprints without damaging delicate anti-reflective (AR) or blue-light protective coatings. Non-abrasive and alcohol-free for daily optical care.',
    features: ['Streak-Free Shine', 'AR Coating Safe', 'Anti-Static Guard', 'Microfiber Compatible'],
    specifications: {
      'Volume': '100 ml spray bottle',
      'Suitability': 'All spectacle lenses, anti-glare coatings, sunglasses',
      'Formula': 'Alcohol-free, pH neutral optical solution',
      'Usage': 'Daily lens maintenance'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eye-sol-02',
    name: 'Multi-Purpose Contact Lens Solution',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    tags: ['eye-solutions', 'contact', 'women', 'men'],
    shortDescription: 'All-in-one disinfecting, rinsing, storing, and hydrating solution for soft contact lenses.',
    fullDescription: 'Formulated for maximum eye comfort, this multi-purpose contact lens solution cleans, disinfects, rinses, and conditions soft contact lenses. It locks in essential moisture for up to 16 hours of comfortable all-day wear.',
    features: ['Dual Disinfection System', 'All-Day Hydration', 'Protein Deposit Removal', 'Sensitive Eyes Formula'],
    specifications: {
      'Volume': '350 ml + Free Lens Case',
      'Lens Compatibility': 'Soft silicone hydrogel & standard hydrogel lenses',
      'Function': 'Clean, Rinse, Disinfect, Hydrate & Store',
      'Certification': 'Ophthalmic standard approved'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eye-sol-03',
    name: 'Hydrating Eye Comfort Drops',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    tags: ['eye-solutions', 'drops', 'women', 'men'],
    shortDescription: 'Soothing lubricant drops designed to alleviate digital eye strain, dryness, and environmental fatigue.',
    fullDescription: 'Formulated to refresh tired eyes exposed to extended screen time, air conditioning, and dust. Delivers immediate moisture replenishment and restores natural tear film stability.',
    features: ['Instant Dry Eye Relief', 'Preservative-Gentle', 'Screen Strain Relief', 'Contact Lens Friendly'],
    specifications: {
      'Volume': '10 ml sterile dropper',
      'Application': '1-2 drops as needed',
      'Ideal For': 'Computer workers, drivers, dry climate comfort',
      'Formulation': 'Sodium Hyaluronate ophthalmic blend'
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  },

  // ================= LENSES =================
  {
    id: 'lens-01',
    name: 'Single Vision Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    tags: ['lenses', 'single-vision', 'women', 'men'],
    shortDescription: 'Precision ground single focal point lenses designed for accurate distance vision or close-up reading correction.',
    fullDescription: 'Custom-crafted single vision prescription lenses tailored to your exact optical sphere and cylinder measurements. Designed for maximum edge-to-edge optical clarity, minimal distortion, and lightweight daily wear comfort.',
    features: ['Custom Prescriptions', 'Super-Light Material', 'Scratch Resistant Coating', 'Crisp Edge Clarity'],
    specifications: {
      'Correction Type': 'Myopia (Distance) / Hyperopia (Near) / Astigmatism',
      'Index Options': '1.56 Mid-Index / 1.61 High-Index / 1.67 Ultra Thin',
      'Coatings': 'Hard coat scratch resistance included',
      'Material': 'Optical grade Polycarbonate / Resin'
    },
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-02',
    name: 'Blue Cut Digital Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    tags: ['lenses', 'blue-cut', 'kids', 'women', 'men'],
    shortDescription: 'Advanced blue light filtering lenses designed to shield your eyes from digital screens, laptops, and smartphones.',
    fullDescription: 'Engineered specifically for the modern digital era. Blue Cut Lenses filter harmful high-energy visible (HEV) blue ray wavelengths (400-450nm) emitted by digital screens, reducing digital eye fatigue, headaches, and sleep disruption.',
    features: ['99% HEV Blue Light Shield', 'Anti-Digital Fatigue', 'Flicker Reduction', 'UV400 Integrated Protection'],
    specifications: {
      'Filter Bandwidth': 'Filters 400nm - 450nm HEV Light',
      'Ideal For': 'Software professionals, students, heavy screen users',
      'Clarity': 'Clear crystal base with subtle blue reflection tint',
      'Coating': 'Hydrophobic easy-clean finish'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-03',
    name: 'Anti-Glare (AR) Premium Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    tags: ['lenses', 'anti-glare', 'women', 'men'],
    shortDescription: 'Multi-layer anti-reflective coating eliminating reflections, night driving glares, and lens halo artifacts.',
    fullDescription: 'Our Anti-Glare (AR) Lenses utilize precision vacuum thin-film coating technology that eliminates 99.5% of light reflection off lens surfaces. Provides exceptional night driving vision, crystal clear eye appearance in photos, and reduced halos.',
    features: ['Eliminates Night Glare', '99.5% Light Transmission', 'Oil & Water Repellent', 'Aesthetic Invisible Look'],
    specifications: {
      'Coating Type': 'Multi-layer Green/Purple AR Spectrum',
      'Night Driving': 'Significantly reduced headlight reflections',
      'Surface Treatment': 'Oleophobic & Hydrophobic top coat',
      'Durability': 'High scratch resistance rating'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'
  },

  // ================= FRAMES / EYEGLASSES =================
  {
    id: 'frame-01',
    name: 'Full Rim Architectural Frames',
    category: 'frames',
    categoryLabel: 'Eyeglasses',
    tags: ['frames', 'eyeglasses', 'spectacles', 'women', 'men'],
    shortDescription: 'Sturdy full-frame design surrounding the entire lens, offering max durability, bold aesthetics, and high protection.',
    fullDescription: 'Classic full rim frames provide complete structural enclosure for all lens thickness profiles. Crafted with precision acetate and light metal alloys, combining bold styling with long-lasting daily durability.',
    features: ['Complete Lens Enclosure', 'Maximum Durability', 'Hides Thick Lens Edges', 'Bold Aesthetic'],
    specifications: {
      'Frame Type': 'Full Rim Spectacle',
      'Material': 'Handcrafted Acetate & Light Alloy',
      'Face Shapes': 'Oval, Round, Heart, Square',
      'Weight': 'Lightweight ergonomic distribution'
    },
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-02',
    name: 'Half Rim Executive Frames',
    category: 'frames',
    categoryLabel: 'Eyeglasses',
    tags: ['frames', 'eyeglasses', 'spectacles', 'men', 'executive'],
    shortDescription: 'Sophisticated browline framing featuring a top rim structure and minimalist nylon lower cord design.',
    fullDescription: 'The perfect blend of professional elegance and lightness. Half rim frames secure the lens across the upper browline while leaving the bottom edge rimless, lightening visual weight on the face.',
    features: ['Lightweight Feel', 'Executive Browline Styling', 'Unobstructed Lower View', 'Spring Hinge Temples'],
    specifications: {
      'Frame Type': 'Half Rim / Supra',
      'Material': 'Stainless Steel / Titanium & Acetate Brow',
      'Nose Pads': 'Adjustable hypoallergenic silicone pads',
      'Style': 'Professional corporate / Smart casual'
    },
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-05',
    name: 'Premium Italian Acetate Frames',
    category: 'frames',
    categoryLabel: 'Eyeglasses',
    tags: ['frames', 'eyeglasses', 'spectacles', 'women', 'acetate'],
    shortDescription: 'Richly patterned, hypoallergenic organic cellulose acetate frames offering vibrant color depth and polished elegance.',
    fullDescription: 'Crafted from high-density bio-based cellulose acetate, these frames feature deep tortoise, marble, and crystal translucent colorways. Polished to a mirror sheen with integrated core-wire temple reinforcement.',
    features: ['Hypoallergenic Organic Resin', 'Rich Tortoise & Crystal Colors', 'Warm Comfort Touch', 'Core Wire Strength'],
    specifications: {
      'Frame Type': 'Acetate Full Rim',
      'Material': 'Mazed Cellulose Acetate',
      'Hinges': '5-barrel German engineered steel hinges',
      'Finish': 'Hand-polished glossy texture'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-06',
    name: 'Flexible Junior Kids Frames',
    category: 'frames',
    categoryLabel: 'Kids',
    tags: ['frames', 'eyeglasses', 'spectacles', 'kids', 'flexible'],
    shortDescription: 'Ultra-flexible, break-resistant, non-toxic frames designed specifically for active children and youth.',
    fullDescription: 'Engineered for kids\' active lifestyles! Constructed from flexible TR90 rubberized polymers without sharp metal screws or hinges. Extremely durable, comfortable, and available in vibrant color combinations.',
    features: ['180° Flexible Bending', 'Shatterproof Rubberized TR90', 'Non-Toxic & BPA Free', 'Head Strap Compatible'],
    specifications: {
      'Frame Type': 'Kids Flexible Ergonomic',
      'Material': 'TR90 Rubberized Polymer',
      'Age Group': 'Children 4 - 14 years',
      'Safety': 'Zero sharp metal edges or loose screws'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
  },

  // ================= SUNGLASSES =================
  {
    id: 'sunglass-01',
    name: 'Polarized UV400 Dark Charcoal Aviator',
    category: 'sunglasses',
    categoryLabel: 'Sunglasses',
    tags: ['sunglasses', 'polarized', 'men', 'women'],
    shortDescription: 'Classic aviator design featuring UV400 protection and high-contrast polarized lenses to eliminate glare.',
    fullDescription: 'Engineered with TAC 7-layer polarized lenses that block 100% of UV rays (UVA & UVB) while eliminating harsh glare from water, roads, and snow. Built with lightweight alloy frame and comfortable silicone nose pads.',
    features: ['TAC Polarized Filter', 'UV400 100% Protection', 'High Contrast Optics', 'Impact Resistant'],
    specifications: {
      'Category': 'Polarized Sunglasses',
      'UV Shield': 'UV400 (200nm - 400nm)',
      'Frame Material': 'Premium Stainless Steel Alloy',
      'Lens Type': 'Triacetate Cellulose (TAC) Polarized'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sunglass-02',
    name: 'Retro Round Gold Metal Sunglasses',
    category: 'sunglasses',
    categoryLabel: 'Sunglasses',
    tags: ['sunglasses', 'retro', 'women', 'men'],
    shortDescription: 'Chic round gold metal sunglasses with dark tinted UV400 protective lenses for stylish outdoor sun wear.',
    fullDescription: 'A timeless vintage silhouette with a modern optical upgrade. Features dark gradient UV-blocking lenses set in a sleek gold wire frame with soft translucent temple tips for all-day comfort.',
    features: ['Retro Round Silhouette', 'UV400 Sun Protection', 'Adjustable Nose Pads', 'Lightweight Wire Frame'],
    specifications: {
      'Category': 'Fashion Sunglasses',
      'UV Rating': 'UV400 Grade 3 Tint',
      'Frame Color': 'Polished Metallic Gold',
      'Fit': 'Unisex medium fit'
    },
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sunglass-03',
    name: 'Junior UV Protected Kids Sunglasses',
    category: 'sunglasses',
    categoryLabel: 'Kids & Sunglasses',
    tags: ['sunglasses', 'kids', 'flexible', 'sport'],
    shortDescription: 'Flexible rubberized kids sunglasses with 100% UV protection and shatterproof lenses for outdoor play.',
    fullDescription: 'Keep young eyes safe in bright sunlight! Features rubberized bendable frames that can flex without breaking, combined with 100% UV400 category 3 dark lenses designed for sensitive young eyes.',
    features: ['Shatterproof Lenses', 'Bendable Flex Frame', '100% UV400 Shield', 'Comfort Nose Bridge'],
    specifications: {
      'Category': 'Kids Polarized Sunglasses',
      'Age Group': 'Children 3 - 12 years',
      'Material': 'Flexible TPEE Rubberized Material',
      'UV Protection': 'UV400 Ophthalmic Standard'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  }
];

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

const PRODUCTS_KEY = 'vision_care_products_v4';

export const restoreAdvancedLensSolution = (productsList) => {
  if (!Array.isArray(productsList) || productsList.length === 0) return DEFAULT_PRODUCTS;
  const originalAdvancedSolution = DEFAULT_PRODUCTS[0];
  let found = false;
  const restored = productsList.map(p => {
    if (p.id === 'eye-sol-01' || p.name === 'Advanced Lens Cleaning Solution') {
      found = true;
      return { ...originalAdvancedSolution };
    }
    return p;
  });
  if (!found) {
    restored.unshift({ ...originalAdvancedSolution });
  }
  return restored;
};

export const getStoredProducts = () => {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length >= 8) {
        const restored = restoreAdvancedLensSolution(parsed);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(restored));
        return restored;
      }
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
  
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_PRODUCTS;
};

export const syncProductsWithAPI = async () => {
  const remoteData = await fetchFromAPI('products');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    try {
      const restored = restoreAdvancedLensSolution(remoteData);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(restored));
      window.dispatchEvent(new CustomEvent('products-updated', { detail: restored }));
      return restored;
    } catch (e) {
      console.error(e);
    }
  }
  return getStoredProducts();
};

export const saveProducts = (products) => {
  try {
    const restored = restoreAdvancedLensSolution(products);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(restored));
    window.dispatchEvent(new CustomEvent('products-updated', { detail: restored }));
    saveToAPI('products', restored);
  } catch (error) {
    console.error('Error saving products:', error);
  }
};


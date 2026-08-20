export const PRODUCTS_DATA = [
  // ================= EYE SOLUTIONS =================
  {
    id: 'eye-sol-01',
    name: 'Advanced Lens Cleaning Solution',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    shortDescription: 'Gentle, streak-free cleaning formula tailored for multi-coated optical spectacle lenses and anti-reflective coatings.',
    fullDescription: 'Our Advanced Lens Cleaning Solution is specially formulated by optical specialists to gently remove dust, smudges, and fingerprints without damaging delicate anti-reflective (AR) or blue-light protective coatings. Non-abrasive and alcohol-free for daily optical care.',
    features: ['Streak-Free Shine', 'AR Coating Safe', 'Anti-Static Guard', 'Microfiber Compatible'],
    specifications: {
      'Volume': '100 ml spray bottle',
      'Suitability': 'All spectacle lenses, anti-glare coatings, sunglasses',
      'Formula': 'Alcohol-free, pH neutral optical solution',
      'Usage': 'Daily lens maintenance'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eye-sol-02',
    name: 'Multi-Purpose Contact Lens Solution',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    shortDescription: 'All-in-one disinfecting, rinsing, storing, and hydrating solution for soft contact lenses.',
    fullDescription: 'Formulated for maximum eye comfort, this multi-purpose contact lens solution cleans, disinfects, rinses, and conditions soft contact lenses. It locks in essential moisture for up to 16 hours of comfortable all-day wear.',
    features: ['Dual Disinfection System', 'All-Day Hydration', 'Protein Deposit Removal', 'Sensitive Eyes Formula'],
    specifications: {
      'Volume': '350 ml + Free Lens Case',
      'Lens Compatibility': 'Soft silicone hydrogel & standard hydrogel lenses',
      'Function': 'Clean, Rinse, Disinfect, Hydrate & Store',
      'Certification': 'Ophthalmic standard approved'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eye-sol-03',
    name: 'Hydrating Eye Comfort Drops',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    shortDescription: 'Soothing lubricant drops designed to alleviate digital eye strain, dryness, and environmental fatigue.',
    fullDescription: 'Formulated to refresh tired eyes exposed to extended screen time, air conditioning, and dust. Delivers immediate moisture replenishment and restores natural tear film stability.',
    features: ['Instant Dry Eye Relief', 'Preservative-Gentle', 'Screen Strain Relief', 'Contact Lens Friendly'],
    specifications: {
      'Volume': '10 ml sterile dropper',
      'Application': '1-2 drops as needed',
      'Ideal For': 'Computer workers, drivers, dry climate comfort',
      'Formulation': 'Sodium Hyaluronate ophthalmic blend'
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eye-sol-04',
    name: 'Rigid & Hard Lens Care Kit',
    category: 'eye-solutions',
    categoryLabel: 'Eye Solutions',
    shortDescription: 'Specialized conditioning and cleaning solution set for RGP (Rigid Gas Permeable) contact lenses.',
    fullDescription: 'Complete care system engineered specifically for hard and gas-permeable lenses. Provides intensive removal of stubborn lipids and protein deposits while ensuring smooth lens cushioning.',
    features: ['Intensive Protein Cleanse', 'Enhanced Surface Wetting', 'RGP Specific', 'Long-lasting Comfort'],
    specifications: {
      'Kit Contents': '120ml Cleaner + 100ml Conditioning Solution + Vented Lens Case',
      'Lens Type': 'RGP & Hard Contact Lenses Only',
      'Usage': 'Daily nightly soak & morning rinse'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
  },

  // ================= LENSES =================
  {
    id: 'lens-01',
    name: 'Single Vision Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Precision ground single focal point lenses designed for accurate distance vision or close-up reading correction.',
    fullDescription: 'Custom-crafted single vision prescription lenses tailored to your exact optical sphere and cylinder measurements. Designed for maximum edge-to-edge optical clarity, minimal distortion, and lightweight daily wear comfort.',
    features: ['Custom Prescriptions', 'Super-Light Material', 'Scratch Resistant Coating', 'Crisp Edge Clarity'],
    specifications: {
      'Correction Type': 'Myopia (Distance) / Hyperopia (Near) / Astigmatism',
      'Index Options': '1.56 Mid-Index / 1.61 High-Index / 1.67 Ultra Thin',
      'Coatings': 'Hard coat scratch resistance included',
      'Material': 'Optical grade Polycarbonate / Resin'
    },
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-02',
    name: 'Blue Cut Digital Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Advanced blue light filtering lenses designed to shield your eyes from digital screens, laptops, and smartphones.',
    fullDescription: 'Engineered specifically for the modern digital era. Blue Cut Lenses filter harmful high-energy visible (HEV) blue ray wavelengths (400-450nm) emitted by digital screens, reducing digital eye fatigue, headaches, and sleep disruption.',
    features: ['99% HEV Blue Light Shield', 'Anti-Digital Fatigue', 'Flicker Reduction', 'UV400 Integrated Protection'],
    specifications: {
      'Filter Bandwidth': 'Filters 400nm - 450nm HEV Light',
      'Ideal For': 'Software professionals, students, heavy screen users',
      'Clarity': 'Clear crystal base with subtle blue reflection tint',
      'Coating': 'Hydrophobic easy-clean finish'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-03',
    name: 'Anti-Glare (AR) Premium Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Multi-layer anti-reflective coating eliminating reflections, night driving glares, and lens halo artifacts.',
    fullDescription: 'Our Anti-Glare (AR) Lenses utilize precision vacuum thin-film coating technology that eliminates 99.5% of light reflection off lens surfaces. Provides exceptional night driving vision, crystal clear eye appearance in photos, and reduced halos.',
    features: ['Eliminates Night Glare', '99.5% Light Transmission', 'Oil & Water Repellent', 'Aesthetic Invisible Look'],
    specifications: {
      'Coating Type': 'Multi-layer Green/Purple AR Spectrum',
      'Night Driving': 'Significantly reduced headlight reflections',
      'Surface Treatment': 'Oleophobic & Hydrophobic top coat',
      'Durability': 'High scratch resistance rating'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-04',
    name: 'Photochromic Transitions Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Intelligent light-adaptive lenses that seamlessly transition from clear indoors to dark sunglasses outdoors.',
    fullDescription: 'Experience intelligent light control with Photochromic Lenses. These smart optics automatically detect UV rays, darkening within seconds outdoors to protect against sunlight glare, and rapidly returning to crystal clear transparency indoors.',
    features: ['Rapid Light Transition', 'Auto UV Sun Shield', 'Indoor Transparency', 'All-in-One Eyewear'],
    specifications: {
      'Activation Speed': 'Darkens in < 30 seconds outdoors',
      'Fade Time': 'Returns clear in 2-3 minutes indoors',
      'Shade Options': 'Deep Charcoal Grey / Classic Brown',
      'Protection': '100% UVA & UVB absorption'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-05',
    name: 'Progressive No-Line Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Seamless multi-focal lenses providing smooth transition between distance, intermediate, and reading focus.',
    fullDescription: 'Eliminate the need for multiple pairs of glasses or visible bifocal lines. Modern Progressive Lenses offer a customized continuous focus gradient from far distance through desktop range down to close-up reading.',
    features: ['Zero Visible Lines', 'Smooth Focus Transition', 'Wide Panoramic Field', 'Presbyopia Solution'],
    specifications: {
      'Focal Zones': 'Distance, Intermediate (Computer), Near (Reading)',
      'Design': 'Digital Freeform HD surfacing',
      'Adaptation Period': 'Minimal distortion with custom fitting',
      'Ideal Age': 'Adults 40+ needing multi-range vision'
    },
    imageUrl: 'https://images.unsplash.com/photo-1582142407894-ec85a1260aee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-06',
    name: 'Computer & Workstation Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Optimized intermediate focus lenses tailored for desk office environments, monitor screens, and reading range.',
    fullDescription: 'Designed specifically for desk workers and indoor professionals. Computer Lenses prioritize an extra-wide middle focal area to cover monitors from 2 to 4 feet, keeping posture relaxed and reducing neck strain.',
    features: ['Extra Wide Desk Field', 'Postural Comfort', 'Mid-Range Focus Shield', 'Anti-Reflective Finish'],
    specifications: {
      'Effective Zone': 'Intermediate (40cm to 2 meters)',
      'Use Case': 'Office, coding, desk work, indoor reading',
      'Ergonomics': 'Reduces neck tilting associated with standard progressives'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lens-07',
    name: 'UV400 Total Protection Lenses',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: 'Maximum solar defense lenses blocking 100% of UVA and UVB solar radiation up to 400 nanometers.',
    fullDescription: 'Protect your cornea, crystalline lens, and delicate retinal tissue from harmful solar ultraviolet exposure. Built with UV-absorbing optical polymers that maintain 100% defense even on overcast days.',
    features: ['100% UVA/UVB Shield', 'Ocular Health Guard', 'Polarized Options', 'High Impact Resistance'],
    specifications: {
      'UV Rating': 'UV400 Certified Defense',
      'Lens Material': 'Trivex / Polycarbonate shatter-resistant resin',
      'Ideal For': 'Outdoor enthusiasts, daytime drivers, sunny climates'
    },
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80'
  },

  // ================= FRAMES =================
  {
    id: 'frame-01',
    name: 'Full Rim Architectural Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Sturdy full-frame design surrounding the entire lens, offering max durability, bold aesthetics, and high protection.',
    fullDescription: 'Classic full rim frames provide complete structural enclosure for all lens thickness profiles. Crafted with precision acetate and light metal alloys, combining bold styling with long-lasting daily durability.',
    features: ['Complete Lens Enclosure', 'Maximum Durability', 'Hides Thick Lens Edges', 'Bold Aesthetic'],
    specifications: {
      'Frame Type': 'Full Rim Spectacle',
      'Material': 'Handcrafted Acetate & Light Alloy',
      'Face Shapes': 'Oval, Round, Heart, Square',
      'Weight': 'Lightweight ergonomic distribution'
    },
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-02',
    name: 'Half Rim Executive Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Sophisticated browline framing featuring a top rim structure and minimalist nylon lower cord design.',
    fullDescription: 'The perfect blend of professional elegance and lightness. Half rim frames secure the lens across the upper browline while leaving the bottom edge rimless, lightening visual weight on the face.',
    features: ['Lightweight Feel', 'Executive Browline Styling', 'Unobstructed Lower View', 'Spring Hinge Temples'],
    specifications: {
      'Frame Type': 'Half Rim / Supra',
      'Material': 'Stainless Steel / Titanium & Acetate Brow',
      'Nose Pads': 'Adjustable hypoallergenic silicone pads',
      'Style': 'Professional corporate / Smart casual'
    },
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-03',
    name: 'Ultra-Minimalist Rimless Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Featherlight frameless design with direct lens mounting for an almost invisible, weightless wearing experience.',
    fullDescription: 'Designed for individuals who seek an understated, rimless optical aesthetic. Lenses are mounted directly to flexible titanium bridge and temples, providing unparalleled lightness and an open facial field.',
    features: ['Featherlight < 10g', 'Minimalist Invisible Look', 'Unrestricted Peripheral Vision', 'Flexible Titanium Temples'],
    specifications: {
      'Frame Type': 'Rimless / 3-Piece Mount',
      'Material': 'Beta Titanium & Memory Metal',
      'Lens Requirement': 'High-impact Polycarbonate / Trivex required',
      'Comfort': 'Pressure-free custom temple flex'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-04',
    name: 'Precision Metal Alloy Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Sleek, ultra-thin metallic frames built from high-strength stainless steel, titanium, and monel metal.',
    fullDescription: 'Slim metal frames offering crisp metallic accents, high structural rigidity, and corrosion-resistant finishes. Equipped with soft adjustable silicone nose pads for tailored positioning.',
    features: ['Corrosion Resistant', 'Ultra-Slim Metal Rim', 'Custom Adjustable Fit', 'Subtle Metallic Sheen'],
    specifications: {
      'Frame Type': 'Metal Wire Rim',
      'Material': 'Monel / Stainless Steel Alloy',
      'Color Finishes': 'Matte Black, Brushed Gunmetal, Warm Gold, Silver',
      'Durability': 'High tensile strength'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-05',
    name: 'Premium Italian Acetate Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Richly patterned, hypoallergenic organic cellulose acetate frames offering vibrant color depth and polished elegance.',
    fullDescription: 'Crafted from high-density bio-based cellulose acetate, these frames feature deep tortoise, marble, and crystal translucent colorways. Polished to a mirror sheen with integrated core-wire temple reinforcement.',
    features: ['Hypoallergenic Organic Resin', 'Rich Tortoise & Crystal Colors', 'Warm Comfort Touch', 'Core Wire Strength'],
    specifications: {
      'Frame Type': 'Acetate Full Rim',
      'Material': 'Mazed Cellulose Acetate',
      'Hinges': '5-barrel German engineered steel hinges',
      'Finish': 'Hand-polished glossy texture'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-06',
    name: 'Flexible Junior Kids Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Ultra-flexible, break-resistant, non-toxic frames designed specifically for active children and youth.',
    fullDescription: 'Engineered for kids\' active lifestyles! Constructed from flexible TR90 rubberized polymers without sharp metal screws or hinges. Extremely durable, comfortable, and available in vibrant color combinations.',
    features: ['180° Flexible Bending', 'Shatterproof Rubberized TR90', 'Non-Toxic & BPA Free', 'Head Strap Compatible'],
    specifications: {
      'Frame Type': 'Kids Flexible Ergonomic',
      'Material': 'TR90 Rubberized Polymer',
      'Age Group': 'Children 4 - 14 years',
      'Safety': 'Zero sharp metal edges or loose screws'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-07',
    name: 'Premium Designer Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Luxury optical frames featuring refined metal inlays, sculptured bevels, and sophisticated styling.',
    fullDescription: 'For those who view eyewear as a statement fashion piece. Our Premium Designer Frames combine handcrafted detailing, subtle brand emblem engravings, and premium ergonomic weight distribution.',
    features: ['Luxury Sculpted Bevels', 'Refined Metal Details', 'Statement Aesthetic', 'Velvet Protective Case'],
    specifications: {
      'Frame Type': 'Luxury Designer Full Rim',
      'Material': 'Combination Titanium & Premium Acetate',
      'Edition': 'Curated optical showcase collection',
      'Includes': 'Custom micro-fiber cloth & premium hardshell box'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'frame-08',
    name: 'Classic Everyday Heritage Frames',
    category: 'frames',
    categoryLabel: 'Frames',
    shortDescription: 'Timeless rectangular and rounded silhouettes offering versatile style, comfort, and everyday reliability.',
    fullDescription: 'Unfussy, classic frames that never go out of style. Clean lines, comfortable bridge fit, and universal styling make these frames an enduring choice for daily work, reading, and casual wear.',
    features: ['Timeless Shape', 'Universal Fit Bridge', 'Light & Balanced', 'All-Occasion Style'],
    specifications: {
      'Frame Type': 'Classic Unisex Shape',
      'Material': 'Lightweight Matte Composite',
      'Colors': 'Solid Black, Navy Blue, Dark Havana, Charcoal',
      'Reliability': 'Proven everyday comfort design'
    },
    imageUrl: 'https://images.unsplash.com/photo-1582142407894-ec85a1260aee?auto=format&fit=crop&w=800&q=80'
  }
];

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

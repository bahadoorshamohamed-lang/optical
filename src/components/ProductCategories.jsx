import React, { useState, useEffect, useMemo, useRef } from 'react';
import ProductCard from './ProductCard';
import { getStoredProducts } from '../data/products';
import { getStoredCategoryCards } from '../data/productCategoryCards';
import { 
  Eye, 
  Glasses, 
  Droplets, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Search, 
  X, 
  LayoutGrid, 
  Layers, 
  SlidersHorizontal,
  Sun,
  ShieldCheck,
  CheckCircle2,
  User,
  UserCheck
} from 'lucide-react';

const ProductCategories = ({ activeTab = null, setActiveTab }) => {
  const [products, setProducts] = useState(getStoredProducts());
  const [categoryCards, setCategoryCards] = useState(getStoredCategoryCards());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // Dual-tier filter state
  const [selectedCategory, setSelectedCategory] = useState(activeTab || 'all');
  const [genderFilter, setGenderFilter] = useState('all'); // 'all' | 'male' | 'female' | 'kids'

  useEffect(() => {
    const handleProductsUpdate = () => {
      setProducts(getStoredProducts());
    };
    const handleCardsUpdate = () => {
      setCategoryCards(getStoredCategoryCards());
    };

    window.addEventListener('products-updated', handleProductsUpdate);
    window.addEventListener('category-cards-updated', handleCardsUpdate);
    return () => {
      window.removeEventListener('products-updated', handleProductsUpdate);
      window.removeEventListener('category-cards-updated', handleCardsUpdate);
    };
  }, []);

  // Sync external activeTab prop with internal state
  useEffect(() => {
    if (!activeTab || activeTab === 'all') {
      setSelectedCategory('all');
      setGenderFilter('all');
    } else {
      const lower = activeTab.toLowerCase().trim();
      if (lower === 'male' || lower === 'men' || lower === 'female' || lower === 'women' || lower === 'kids') {
        if (lower === 'men') setGenderFilter('male');
        else if (lower === 'women') setGenderFilter('female');
        else setGenderFilter(lower);
      } else if (lower.includes('sunglass') && (lower.includes('male') || lower.includes('men') || lower.includes('man'))) {
        setSelectedCategory('sunglasses');
        setGenderFilter('male');
      } else if (lower.includes('sunglass') && (lower.includes('female') || lower.includes('women') || lower.includes('lady'))) {
        setSelectedCategory('sunglasses');
        setGenderFilter('female');
      } else if (lower.includes('sunglass') && lower.includes('kid')) {
        setSelectedCategory('sunglasses');
        setGenderFilter('kids');
      } else if (lower === 'spectacles' || lower === 'eyeglasses') {
        setSelectedCategory('frames');
        setGenderFilter('all');
      } else {
        setSelectedCategory(activeTab);
        setGenderFilter('all');
      }
    }
  }, [activeTab]);

  // Core Main Categories with visual details & icons dynamically loaded from state/API
  const coreCategories = useMemo(() => {
    return categoryCards
      .filter(c => c.isActive !== false)
      .map(c => {
        let icon = Glasses;
        if (c.id === 'eye-solutions' || c.targetTab === 'eye-solutions') icon = Droplets;
        else if (c.id === 'lenses' || c.targetTab === 'lenses') icon = Eye;
        else if (c.id === 'frames' || c.targetTab === 'frames') icon = Glasses;
        else if (c.id === 'sunglasses' || c.targetTab === 'sunglasses') icon = Sun;

        return {
          ...c,
          icon,
          badgeColor: c.badgeColor || 'bg-emerald-500/90'
        };
      });
  }, [categoryCards]);

  // Primary Category Filter Pills
  const primaryCategories = [
    { id: 'all', label: 'All Catalogue', icon: Layers },
    { id: 'sunglasses', label: 'Sunglasses', icon: Sun },
    { id: 'frames', label: 'Frames', icon: Glasses },
    { id: 'lenses', label: 'Lenses', icon: Eye },
    { id: 'eye-solutions', label: 'Care Solutions', icon: Droplets },
    { id: 'kids', label: 'Kids', icon: Eye },
  ];

  // Demographic / Gender Sub-filter Pills (Male, Female, Kids, All)
  const genderFilters = [
    { id: 'all', label: 'All', icon: Layers },
    { id: 'male', label: 'Male', icon: User },
    { id: 'female', label: 'Female', icon: Sparkles },
    { id: 'kids', label: 'Kids', icon: Eye },
  ];

  // Dynamic Product Counts calculation
  const categoryCounts = useMemo(() => {
    const counts = {
      all: products.length,
      'eye-solutions': 0,
      lenses: 0,
      frames: 0,
      sunglasses: 0,
      kids: 0,
    };

    products.forEach((product) => {
      const cat = product.category?.toLowerCase();
      if (counts[cat] !== undefined) {
        counts[cat] += 1;
      }
      if (product.tags) {
        product.tags.forEach((tag) => {
          const t = tag.toLowerCase();
          if (counts[t] !== undefined) counts[t] += 1;
          else counts[t] = (counts[t] || 0) + 1;
        });
      }
    });

    return counts;
  }, [products]);

  // Filtered Products computation based on selectedCategory, genderFilter and searchQuery
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Category Filter
      let matchesCategory = true;
      if (selectedCategory && selectedCategory !== 'all') {
        const catQuery = selectedCategory.toLowerCase().trim();
        const catLabel = (product.categoryLabel || '').toLowerCase();
        const prodCat = (product.category || '').toLowerCase();
        
        if (catQuery === 'sunglasses') {
          matchesCategory = prodCat === 'sunglasses' || catLabel.includes('sunglass') ||
            (product.tags && product.tags.some(t => t.toLowerCase().includes('sunglass')));
        } else if (catQuery === 'frames' || catQuery === 'eyeglasses' || catQuery === 'spectacles') {
          matchesCategory = ['frames', 'eyeglasses', 'spectacles'].includes(prodCat) || catLabel.includes('frame') || catLabel.includes('eyeglass') || catLabel.includes('spectacle') ||
            (product.tags && product.tags.some(t => ['frames', 'eyeglasses', 'spectacles'].includes(t.toLowerCase())));
        } else if (catQuery === 'lenses') {
          matchesCategory = prodCat === 'lenses' || catLabel.includes('lens') ||
            (product.tags && product.tags.some(t => t.toLowerCase().includes('lens')));
        } else if (catQuery === 'eye-solutions' || catQuery === 'care' || catQuery === 'solutions') {
          matchesCategory = prodCat === 'eye-solutions' || catLabel.includes('solution') || catLabel.includes('care') ||
            (product.tags && product.tags.some(t => t.toLowerCase().includes('eye-solutions')));
        } else if (catQuery === 'kids') {
          matchesCategory = prodCat === 'kids' || catLabel.includes('kid') ||
            (product.tags && product.tags.some(t => t.toLowerCase().includes('kids')));
        } else {
          matchesCategory = prodCat === catQuery || catLabel.includes(catQuery) ||
            (product.tags && product.tags.some(t => t.toLowerCase() === catQuery));
        }
      }

      // 2. Gender / Demographic Sub-Filter (Male, Female, Kids)
      let matchesGender = true;
      if (genderFilter && genderFilter !== 'all') {
        const gQuery = genderFilter.toLowerCase().trim();
        
        // Check if product has explicit demographic tags
        const hasExplicitGenderTag = product.tags && product.tags.some(t => {
          const tLower = t.toLowerCase();
          return ['male', 'men', 'mens', 'man', 'female', 'women', 'womens', 'woman', 'lady', 'kids', 'junior', 'child', 'children'].includes(tLower);
        });

        const tagMatch = product.tags && product.tags.some(t => {
          const tLower = t.toLowerCase();
          if (gQuery === 'male' || gQuery === 'men') {
            return ['male', 'men', 'mens', 'man'].includes(tLower);
          }
          if (gQuery === 'female' || gQuery === 'women') {
            return ['female', 'women', 'womens', 'woman', 'lady'].includes(tLower);
          }
          if (gQuery === 'kids') {
            return ['kids', 'junior', 'child', 'children'].includes(tLower);
          }
          return tLower === gQuery;
        });

        const nameLower = product.name?.toLowerCase() || '';
        const descLower = product.shortDescription?.toLowerCase() || '';
        const catLabelLower = product.categoryLabel?.toLowerCase() || '';
        const textMatch = 
          ((gQuery === 'male' || gQuery === 'men') && (nameLower.includes('men') || nameLower.includes('male') || descLower.includes('men') || descLower.includes('male') || catLabelLower.includes('men'))) ||
          ((gQuery === 'female' || gQuery === 'women') && (nameLower.includes('women') || nameLower.includes('female') || descLower.includes('women') || descLower.includes('female') || catLabelLower.includes('women'))) ||
          (gQuery === 'kids' && (nameLower.includes('kids') || nameLower.includes('junior') || descLower.includes('kids')));

        // If product has no explicit demographic tag (freshly created by admin), include it so it doesn't get hidden
        matchesGender = tagMatch || textMatch || !hasExplicitGenderTag;
      }

      // 3. Search Query Filter
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.shortDescription.toLowerCase().includes(query) || 
                          product.fullDescription?.toLowerCase().includes(query);
        const categoryMatch = product.categoryLabel.toLowerCase().includes(query);
        const tagMatch = product.tags?.some(tag => tag.toLowerCase().includes(query));
        const featureMatch = product.features?.some(f => f.toLowerCase().includes(query));

        matchesSearch = nameMatch || descMatch || categoryMatch || tagMatch || featureMatch;
      }

      return matchesCategory && matchesGender && matchesSearch;
    });
  }, [products, selectedCategory, genderFilter, searchQuery]);

  // Current category info object if selectedCategory matches core category
  const currentCategoryInfo = coreCategories.find(c => c.id === selectedCategory || c.targetTab === selectedCategory) ||
    ((selectedCategory === 'eyeglasses' || selectedCategory === 'spectacles') ? coreCategories.find(c => c.id === 'frames') : null);

  // Dynamic context headline text
  const getContextTitle = () => {
    let catLabel = 'Optical Products';
    if (selectedCategory === 'sunglasses') catLabel = 'Sunglasses';
    else if (selectedCategory === 'frames') catLabel = 'Frames & Eyeglasses';
    else if (selectedCategory === 'lenses') catLabel = 'Lenses';
    else if (selectedCategory === 'eye-solutions') catLabel = 'Care Solutions';
    else if (selectedCategory === 'kids') catLabel = 'Kids Eyewear';

    if (genderFilter === 'male' || genderFilter === 'men') return `Male ${catLabel}`;
    if (genderFilter === 'female' || genderFilter === 'women') return `Female ${catLabel}`;
    if (genderFilter === 'kids') return `Kids ${catLabel}`;
    return `All ${catLabel}`;
  };

  // Reset slider index whenever filters or search change
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCategory, genderFilter, searchQuery, viewMode]);

  // Auto-advance carousel every 4 seconds when in carousel mode & not paused
  useEffect(() => {
    if (viewMode !== 'carousel' || isPaused || filteredProducts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % filteredProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, filteredProducts.length]);

  const handleNextSlide = () => {
    if (filteredProducts.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const handlePrevSlide = () => {
    if (filteredProducts.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const handleCategoryClick = (catId) => {
    const targetCat = catId || 'all';
    setSelectedCategory(targetCat);
    setGenderFilter('all');
    if (setActiveTab) {
      setActiveTab(targetCat === 'all' ? null : targetCat);
    }
  };

  const handleGenderClick = (gId) => {
    setGenderFilter(gId);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setGenderFilter('all');
    if (setActiveTab) setActiveTab(null);
    setSearchQuery('');
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-optom-slate-bg border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Ambient Optical Background Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-10 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl animate-float-optic" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-optom-maroon/10 blur-3xl animate-float-optic" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Anchor Points for Smooth Navigation */}
      <div id="eye-solutions" className="absolute top-0"></div>
      <div id="lenses" className="absolute top-0"></div>
      <div id="frames" className="absolute top-0"></div>
      <div id="sunglasses" className="absolute top-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Core Category Visual Showcase Cards */}
        <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 max-w-7xl mx-auto">
          {coreCategories.map((cat) => {
            const isActive = selectedCategory === cat.id || selectedCategory === cat.targetTab;
            const IconComponent = cat.icon;
            const itemCount = categoryCounts[cat.id] || categoryCounts[cat.targetTab] || 0;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.targetTab || cat.id)}
                className={`group relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/11] cursor-pointer transition-all duration-500 transform hover:-translate-y-1.5 focus:outline-none shadow-md w-[75vw] xs:w-[240px] md:w-auto flex-shrink-0 snap-center ${
                  isActive
                    ? 'ring-4 ring-emerald-400 scale-[1.02] shadow-2xl bg-slate-900'
                    : 'hover:shadow-xl border border-slate-200/90 opacity-95 hover:opacity-100 bg-slate-900'
                }`}
              >
                {/* Image Background */}
                <img
                  src={cat.imageUrl}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Glassmorphic Dark Gradient Overlay */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-t from-slate-950 via-slate-900/60 to-black/30' 
                      : 'bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-black/20 group-hover:from-slate-950'
                  }`} 
                />

                {/* Continuous Shimmer Light Sheen */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className={`p-2 sm:p-2.5 rounded-2xl backdrop-blur-md shadow-md transition-colors duration-300 ${
                    isActive ? 'bg-optom-green text-white' : 'bg-white/95 text-optom-green group-hover:bg-optom-green group-hover:text-white'
                  }`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-black text-white shadow-md backdrop-blur-md border border-white/20 uppercase tracking-wider ${cat.badgeColor}`}>
                    {itemCount} Items
                  </span>
                </div>

                {/* Card Content Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white space-y-0.5 z-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest truncate">
                      {cat.tagline}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-lg font-serif font-extrabold tracking-tight group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2 text-white">
                    <span>{cat.label}</span>
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Category & Demographic Sub-Filter System */}
        <div className="space-y-4 max-w-7xl mx-auto">
          
          {/* Tier 1: Primary Category Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">Category:</span>
            {primaryCategories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id || 
                (cat.id === 'all' && (!selectedCategory || selectedCategory === 'all')) || 
                ((cat.id === 'frames') && (selectedCategory === 'spectacles' || selectedCategory === 'eyeglasses'));
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id === 'all' ? null : cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-300 shadow-xs cursor-pointer ${
                    isSelected
                      ? 'bg-optom-green text-white ring-2 ring-emerald-400 scale-105 shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Context Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-100 text-optom-green font-bold shadow-xs">
              {currentCategoryInfo ? (
                React.createElement(currentCategoryInfo.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })
              ) : selectedCategory === 'sunglasses' ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Glasses className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
              <h3 className="text-lg sm:text-2xl font-extrabold text-optom-slate-heading capitalize flex items-center gap-2">
                <span>{selectedCategory === 'sunglasses' ? 'Sunglasses Collection' : getContextTitle()}</span>
                <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </span>
              </h3>

              {/* Male & Female Option Buttons Directly In Header Bar for Sunglasses */}
              {selectedCategory === 'sunglasses' && (
                <div className="flex items-center gap-1.5 bg-slate-900 text-white p-1 rounded-2xl shadow-md border border-slate-700">
                  <button
                    onClick={() => handleGenderClick('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      genderFilter === 'all' ? 'bg-optom-green text-white shadow-xs scale-105' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleGenderClick('male')}
                    className={`flex items-center gap-1 px-3.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      (genderFilter === 'male' || genderFilter === 'men') ? 'bg-optom-green text-white shadow-xs scale-105 ring-2 ring-emerald-400' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-amber-300" />
                    <span>Male</span>
                  </button>
                  <button
                    onClick={() => handleGenderClick('female')}
                    className={`flex items-center gap-1 px-3.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      (genderFilter === 'female' || genderFilter === 'women') ? 'bg-optom-green text-white shadow-xs scale-105 ring-2 ring-emerald-400' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>Female</span>
                  </button>
                  <button
                    onClick={() => handleGenderClick('kids')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      genderFilter === 'kids' ? 'bg-optom-green text-white shadow-xs scale-105 ring-2 ring-emerald-400' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Kids</span>
                  </button>
                </div>
              )}
            </div>

            {searchQuery && (
              <p className="text-xs text-slate-500 mt-0.5 w-full">
                Showing matches for "<span className="font-bold text-optom-slate-heading">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Carousel Navigation Buttons (Visible when in carousel mode) */}
          {viewMode === 'carousel' && filteredProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">
                Item {currentSlideIndex + 1} of {filteredProducts.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-optom-slate-heading hover:bg-optom-green hover:text-white transition-all shadow-xs active:scale-95"
                  aria-label="Previous Product"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-optom-slate-heading hover:bg-optom-green hover:text-white transition-all shadow-xs active:scale-95"
                  aria-label="Next Product"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PRODUCTS PRESENTATION DISPLAY AREA */}
        {filteredProducts.length > 0 ? (
          <div>
            
            {/* MODE 1: GRID VIEW MODE (2 Cols on Mobile, 4 Cols on Desktop) */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

            {/* MODE 2: CAROUSEL SHOWCASE MODE */}
            {viewMode === 'carousel' && (
              <div className="space-y-6">
                <div 
                  ref={sliderRef}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="relative overflow-hidden rounded-3xl p-1"
                >
                  <div 
                    className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) gap-6"
                    style={{
                      transform: `translateX(-${currentSlideIndex * 100}%)`
                    }}
                  >
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex-shrink-0"
                      >
                        <ProductCard
                          product={product}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Progress Indicators */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {filteredProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        idx === currentSlideIndex 
                          ? 'w-8 bg-optom-green shadow-md ring-2 ring-emerald-300' 
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Empty State when no products match filters */
          <div className="text-center py-16 px-6 rounded-3xl bg-white/70 border border-slate-200/90 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-optom-green flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-optom-slate-heading">No Products Found</h4>
              <p className="text-xs text-optom-slate-body">
                We couldn't find any optical products matching your filter or search query.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-2xl bg-optom-green text-white text-xs font-bold shadow-md hover:bg-optom-green-hover transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom Optical Guarantee Strip */}
        <div className="max-w-5xl mx-auto pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            
            <div className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-optom-green flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-optom-slate-heading">100% Optical Grade</h5>
                <p className="text-[11px] text-slate-500">Certified ophthalmic lens materials</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-rose-100 text-optom-maroon flex-shrink-0">
                <Glasses className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-optom-slate-heading">In-Store Prescription Fitting</h5>
                <p className="text-[11px] text-slate-500">Precision lens alignment & mounting</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 flex-shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-optom-slate-heading">Doctor Formulated Care</h5>
                <p className="text-[11px] text-slate-500">Gentle AR coating safe solutions</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;

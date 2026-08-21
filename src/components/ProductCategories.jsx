import React, { useState, useEffect, useMemo, useRef } from 'react';
import ProductCard from './ProductCard';
import { getStoredProducts } from '../data/products';
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
  CheckCircle2
} from 'lucide-react';

const ProductCategories = ({ onSelectProduct, activeTab = null, setActiveTab }) => {
  const [products, setProducts] = useState(getStoredProducts());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(getStoredProducts());
    };
    window.addEventListener('products-updated', handleUpdate);
    return () => window.removeEventListener('products-updated', handleUpdate);
  }, []);

  // Core Main Categories with visual details & icons
  const coreCategories = [
    { 
      id: 'eye-solutions', 
      label: 'Eye Solutions', 
      tagline: 'Clinically Formulated Care',
      description: 'Disinfecting drops, cleaning formulas, & hydration kits for lenses & eyes.',
      icon: Droplets, 
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-cyan-500/90'
    },
    { 
      id: 'lenses', 
      label: 'Lenses Collection', 
      tagline: 'High-Precision Optics',
      description: 'Blue cut, anti-glare, single vision, & photochromic transition lenses.',
      icon: Eye, 
      imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-emerald-500/90'
    },
    { 
      id: 'frames', 
      label: 'Frames Collection', 
      tagline: 'Ergonomic Eyewear Styles',
      description: 'Full rim, half rim, rimless titanium, Italian acetate & flexible kids frames.',
      icon: Glasses, 
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-amber-500/90'
    },
  ];

  // Additional Demographic & Feature Filter Pills
  const quickFilters = [
    { id: 'all', label: 'All Catalogue', icon: Layers },
    { id: 'women', label: 'Women', icon: Sparkles },
    { id: 'men', label: 'Men', icon: Glasses },
    { id: 'kids', label: 'Kids', icon: Eye },
    { id: 'sunglasses', label: 'Sunglasses', icon: Sun },
    { id: 'clipon', label: 'Clip-On', icon: SlidersHorizontal },
    { id: 'frames', label: 'Frames', icon: Glasses },
    { id: 'lenses', label: 'Lenses', icon: Eye },
    { id: 'eye-solutions', label: 'Care Solutions', icon: Droplets },
  ];

  // Dynamic Product Counts calculation for categories
  const categoryCounts = useMemo(() => {
    const counts = {
      all: products.length,
      'eye-solutions': 0,
      lenses: 0,
      frames: 0,
    };

    products.forEach((product) => {
      if (counts[product.category] !== undefined) {
        counts[product.category] += 1;
      }
      if (product.tags) {
        product.tags.forEach((tag) => {
          if (!counts[tag]) counts[tag] = 0;
          counts[tag] += 1;
        });
      }
    });

    return counts;
  }, [products]);

  // Filtered Products computation based on activeTab and searchQuery
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Tab / Category Filter
      let matchesTab = true;
      if (activeTab && activeTab !== 'all') {
        const isCategoryMatch = product.category === activeTab;
        const isTagMatch = product.tags && product.tags.includes(activeTab);
        matchesTab = isCategoryMatch || isTagMatch;
      }

      // 2. Search Query Filter
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

      return matchesTab && matchesSearch;
    });
  }, [products, activeTab, searchQuery]);

  // Current category info object if activeTab matches core category
  const currentCategoryInfo = coreCategories.find(c => c.id === activeTab);

  // Reset slider index whenever filters or search change
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeTab, searchQuery, viewMode]);

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
    if (activeTab === catId) {
      // Toggle off if clicked twice
      setActiveTab(null);
    } else {
      setActiveTab(catId);
    }
  };

  const clearFilters = () => {
    setActiveTab(null);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Core Category Visual Showcase (Row Layout on Mobile) */}
        <div className="flex md:grid md:grid-cols-3 gap-3 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 max-w-6xl mx-auto">
          {coreCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            const IconComponent = cat.icon;
            const itemCount = categoryCounts[cat.id] || 0;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/11] cursor-pointer transition-all duration-500 transform hover:-translate-y-1.5 focus:outline-none shadow-md w-[80vw] xs:w-[260px] md:w-auto flex-shrink-0 snap-center ${
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
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <div className={`p-2 sm:p-2.5 rounded-2xl backdrop-blur-md shadow-md transition-colors duration-300 ${
                    isActive ? 'bg-optom-green text-white' : 'bg-white/95 text-optom-green group-hover:bg-optom-green group-hover:text-white'
                  }`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-black text-white shadow-md backdrop-blur-md border border-white/20 uppercase tracking-wider ${cat.badgeColor}`}>
                    {itemCount} Products
                  </span>
                </div>

                {/* Card Content Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white space-y-0.5 sm:space-y-1 z-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-widest">
                      {cat.tagline}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-xl font-serif font-extrabold tracking-tight group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2 text-white">
                    <span>{cat.label}</span>
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 sm:line-clamp-2 leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Live Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lenses, frames, solutions..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-optom-slate-heading placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-optom-green/40 focus:border-optom-green transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Layout Switcher (Grid vs Carousel Mode) */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                View Mode:
              </span>
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-optom-green text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid ({filteredProducts.length})</span>
                </button>
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    viewMode === 'carousel'
                      ? 'bg-optom-green text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Showcase Carousel</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Demographic / Style Tag Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar pb-1 max-w-full">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pr-1 hidden lg:inline flex-shrink-0">
              Filter:
            </span>
            {quickFilters.map((filter) => {
              const isSelected = activeTab === filter.id || (filter.id === 'all' && !activeTab);
              const count = categoryCounts[filter.id] || (filter.id === 'all' ? products.length : 0);
              const IconComp = filter.icon;

              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveTab(filter.id === 'all' ? null : filter.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex-shrink-0 ${
                    isSelected
                      ? 'bg-optom-green text-white shadow-md ring-2 ring-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{filter.label}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {(activeTab || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold text-optom-maroon hover:bg-rose-50 transition-colors ml-auto flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* Dynamic Context Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-100 text-optom-green font-bold shadow-xs">
              {currentCategoryInfo ? (
                React.createElement(currentCategoryInfo.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })
              ) : (
                <Glasses className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-optom-slate-heading capitalize flex items-center gap-2">
                <span>
                  {activeTab ? `${activeTab.replace('-', ' ')} Collection` : 'All Optical Products'}
                </span>
              </h3>
              {searchQuery && (
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing matches for "<span className="font-bold text-optom-slate-heading">{searchQuery}</span>"
                </p>
              )}
            </div>
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
                    onSelect={onSelectProduct}
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
                          onSelect={onSelectProduct}
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

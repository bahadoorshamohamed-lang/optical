import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS_DATA } from '../data/products';
import { Eye, Glasses, Droplets, Sparkles, Focus, ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';

const ProductCategories = ({ onSelectProduct, activeTab = null, setActiveTab }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 3 Categories: Eye Solutions, Lenses, Frames
  const categories = [
    { 
      id: 'eye-solutions', 
      label: 'Eye Solutions Collection', 
      icon: Droplets, 
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    },
    { 
      id: 'lenses', 
      label: 'Lenses Collection', 
      icon: Eye, 
      imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    },
    { 
      id: 'frames', 
      label: 'Frames Collection', 
      icon: Glasses, 
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const currentCategoryInfo = activeTab ? categories.find(c => c.id === activeTab) : null;

  // Filter products by touched category ONLY
  const categoryProducts = activeTab ? PRODUCTS_DATA.filter((product) => product.category === activeTab) : [];

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeTab]);

  // Automatic moving product image slide transition every 3 seconds (3000ms)
  useEffect(() => {
    if (!activeTab || categoryProducts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % categoryProducts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeTab, categoryProducts.length]);

  const handleNextSlide = () => {
    if (categoryProducts.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % categoryProducts.length);
  };

  const handlePrevSlide = () => {
    if (categoryProducts.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + categoryProducts.length) % categoryProducts.length);
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-optom-slate-bg border-b border-slate-200/60 relative overflow-hidden">
      
      {/* Animated Optical Background Light Beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-10 w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl animate-float-optic" />
        <div className="absolute bottom-12 right-10 w-72 h-72 rounded-full bg-rose-300/20 blur-3xl animate-float-optic" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Animated Optical Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4 relative">
          
          {/* Animated Eyeglass / Optics Focus Scanner Graphic */}
          <div className="mx-auto w-16 h-16 relative flex items-center justify-center">
            {/* Expanding Pulse Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-optom-green animate-optical-pulse" />
            <div className="absolute inset-0 rounded-full border border-optom-maroon/60 animate-optical-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Center Animated Optical Focus Icon */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-optom-green to-emerald-900 text-white flex items-center justify-center shadow-lg border border-emerald-300 animate-float-optic">
              <Focus className="w-6 h-6 text-emerald-200 animate-spin-slow" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/90 text-optom-green text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-optom-maroon animate-bounce" />
            <span>Interactive Optical Catalogue</span>
          </div>

          {/* Headline */}
          <div className="relative inline-block overflow-hidden rounded-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-optom-slate-heading tracking-tight px-2">
              Explore Optical Products
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent w-1/2 animate-beam-scan pointer-events-none" />
          </div>
        </div>

        {/* 3 Category Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group relative rounded-3xl overflow-hidden aspect-[16/11] text-left transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none shadow-md ${
                  isActive
                    ? 'ring-4 ring-optom-green scale-105 shadow-2xl'
                    : 'hover:shadow-xl border border-slate-200 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Category Picture Background */}
                <img
                  src={cat.imageUrl}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-black/20' 
                    : 'bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-black/20 group-hover:from-slate-950/90'
                }`} />

                {/* Animated Light Glare Sweep on Hover/Select */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Active Category Indicator Badge */}
                {isActive && (
                  <div className="absolute top-3 right-3 bg-optom-green text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1 animate-fadeIn">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Active Focus</span>
                  </div>
                )}

                {/* Clean Category Name Label */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                    {cat.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Anchor points for navigation */}
        <div id="eye-solutions" className="h-0 w-0"></div>
        <div id="lenses" className="h-0 w-0"></div>
        <div id="frames" className="h-0 w-0"></div>

        {/* AUTO-MOVING PRODUCT IMAGE SLIDER — SHOWS WHEN A CATEGORY IS CLICKED */}
        {activeTab && currentCategoryInfo && categoryProducts.length > 0 ? (
          <div className="space-y-8 animate-fadeIn pt-4">
            
            {/* Selected Category Header Badge & Slide Counter */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-100 text-optom-green font-bold shadow-xs animate-float-optic">
                  {React.createElement(currentCategoryInfo.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-optom-slate-heading flex items-center gap-2">
                    {currentCategoryInfo.label}
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-optom-green border border-emerald-200">
                      Auto-Moving Showcase ({currentSlideIndex + 1}/{categoryProducts.length})
                    </span>
                  </h3>
                </div>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-optom-slate-heading hover:bg-optom-green hover:text-white transition-all shadow-xs"
                  aria-label="Previous Product"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-optom-slate-heading hover:bg-optom-green hover:text-white transition-all shadow-xs"
                  aria-label="Next Product"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Moving Product Slider Container */}
            <div className="relative overflow-hidden rounded-3xl p-2">
              <div 
                className="flex transition-transform duration-700 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentSlideIndex * 100}%)`
                }}
              >
                {categoryProducts.map((product) => (
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

            {/* Slider Indicator Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {categoryProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    idx === currentSlideIndex 
                      ? 'w-8 bg-optom-green' 
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        ) : (
          /* Initial Prompt when no category is touched yet */
          <div className="text-center py-10 px-4 rounded-3xl bg-white/60 border border-slate-200/80 shadow-xs max-w-xl mx-auto space-y-3">
            <MousePointerClick className="w-8 h-8 text-optom-green mx-auto animate-bounce" />
            <p className="text-sm font-extrabold text-optom-slate-heading">
              Touch any category card above to activate focus & auto-moving product showcase
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCategories;

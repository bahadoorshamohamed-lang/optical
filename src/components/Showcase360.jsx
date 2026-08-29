import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal, Scan, Sparkles } from 'lucide-react';
import { getStoredShowcase360 } from '../data/showcase360';

const Showcase360 = () => {
  const [showcaseItems, setShowcaseItems] = useState(getStoredShowcase360());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [progress, setProgress] = useState(0);

  const lastInteractionRef = useRef(Date.now());

  // Real-time Event Listener for Admin Data Updates
  useEffect(() => {
    const handleUpdate = () => {
      setShowcaseItems(getStoredShowcase360());
    };
    window.addEventListener('showcase360-updated', handleUpdate);
    return () => window.removeEventListener('showcase360-updated', handleUpdate);
  }, []);

  // Filter Active Items Only
  const activeProducts = showcaseItems.filter(item => item.isActive !== false);

  // Safety check on activeIndex range
  useEffect(() => {
    if (activeIndex >= activeProducts.length && activeProducts.length > 0) {
      setActiveIndex(0);
    }
  }, [activeProducts.length, activeIndex]);

  // Automatic Gallery Timer & Smooth Animatic Progress Line
  useEffect(() => {
    if (activeProducts.length <= 1) return;
    setProgress(0);
    const intervalTime = 50; // Update progress bar every 50ms
    const totalTime = 4500;
    
    const progressTimer = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteractionRef.current;
      if (timeSinceInteraction >= 2000 && !isDragging) {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((old) => (old + 1) % activeProducts.length);
            return 0;
          }
          return prev + (intervalTime / totalTime) * 100;
        });
      }
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, [activeIndex, isDragging, activeProducts.length]);

  if (!activeProducts || activeProducts.length === 0) {
    return null; // Return null if no active showcase items
  }

  // Touch / Mouse Drag Controls
  const handleStartDrag = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    lastInteractionRef.current = Date.now();
  };

  const handleMoveDrag = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
    lastInteractionRef.current = Date.now();
  };

  const handleEndDrag = () => {
    setIsDragging(false);
    lastInteractionRef.current = Date.now();
  };

  const handleNext = () => {
    if (activeProducts.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % activeProducts.length);
    lastInteractionRef.current = Date.now();
  };

  const handlePrev = () => {
    if (activeProducts.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length);
    lastInteractionRef.current = Date.now();
  };

  const activeProduct = activeProducts[activeIndex] || activeProducts[0];

  // Helper for bullet lines
  const descriptionLines = Array.isArray(activeProduct.descriptionLines)
    ? activeProduct.descriptionLines
    : (typeof activeProduct.descriptionLines === 'string'
        ? activeProduct.descriptionLines.split('\n').filter(Boolean)
        : [activeProduct.descriptionLines || '']);

  return (
    <section id="showcase-360" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 overflow-hidden relative border-b border-slate-200/80 select-none">
      
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-3xl pointer-events-none animate-float-optic" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none animate-float-optic" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium White Split Layout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] sm:min-h-[560px] rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(11,79,55,0.08)] overflow-hidden relative">
          
          {/* ================= LEFT SIDE — ONLY PRODUCT DESCRIPTION CONTENT ================= */}
          <div className="lg:col-span-5 bg-slate-50/70 p-5 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 z-20 relative">
            
            {/* Top Animatic Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200/70 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-optom-green to-emerald-400 shadow-[0_0_10px_rgba(11,79,55,0.4)] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4 sm:space-y-6 pt-2 animate-fadeIn" key={activeIndex}>
              
              {/* Category Badge & Slide Counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-optom-green uppercase tracking-widest px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-emerald-100/90 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <Scan className="w-3.5 h-3.5 text-optom-maroon animate-pulse" />
                  <span>{activeProduct.category}</span>
                </span>
                <span className="text-xs font-extrabold text-slate-500 font-mono tracking-widest">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(activeProducts.length).padStart(2, '0')}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-optom-slate-heading tracking-tight leading-tight">
                {activeProduct.title}
              </h2>

              {/* Synchronized Description Lines for Active Image */}
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-optom-slate-body leading-relaxed font-medium">
                {descriptionLines.map((line, idx) => (
                  <p key={idx} className="flex items-start gap-2.5 group">
                    <span className="w-2 h-2 rounded-full bg-optom-green mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform shadow-xs" />
                    <span>{line}</span>
                  </p>
                ))}
              </div>

            </div>

            {/* Bottom Controls: Arrow Buttons & Indicator Bars */}
            <div className="pt-6 sm:pt-8 space-y-4 sm:space-y-6">
              
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Circular Arrow Left */}
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-slate-200 bg-white text-optom-slate-heading hover:bg-optom-green hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none shadow-md group"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Circular Arrow Right */}
                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-slate-200 bg-white text-optom-slate-heading hover:bg-optom-green hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none shadow-md group"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Progress Step Bars */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
                {activeProducts.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIndex(idx);
                        lastInteractionRef.current = Date.now();
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 flex-shrink-0 ${
                        isActive 
                          ? 'w-10 sm:w-14 bg-optom-green shadow-sm ring-2 ring-emerald-300' 
                          : 'w-6 sm:w-8 bg-slate-300/80 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

            </div>

          </div>


          {/* ================= RIGHT SIDE — IMAGES ONLY WITH WHITE PREMIUM CAROUSEL ================= */}
          <div 
            className="lg:col-span-7 bg-gradient-to-tr from-slate-100/90 via-slate-50 to-emerald-50/30 relative flex items-center justify-center p-4 sm:p-10 overflow-hidden cursor-grab active:cursor-grabbing min-h-[380px] sm:min-h-[480px]"
            onMouseDown={(e) => handleStartDrag(e.clientX)}
            onMouseMove={(e) => handleMoveDrag(e.clientX)}
            onMouseUp={handleEndDrag}
            onMouseLeave={handleEndDrag}
            onTouchStart={(e) => handleStartDrag(e.touches[0].clientX)}
            onTouchMove={(e) => handleMoveDrag(e.touches[0].clientX)}
            onTouchEnd={handleEndDrag}
          >
            
            {/* Corner Tech Watermarks */}
            <div className="absolute top-3 left-3 font-mono text-[9px] sm:text-[10px] font-extrabold text-optom-green tracking-widest pointer-events-none">
              + OPTIC.360.GALLERY
            </div>
            <div className="absolute top-3 right-3 font-mono text-[9px] sm:text-[10px] font-extrabold text-slate-500 tracking-widest pointer-events-none">
              POS: {activeIndex + 1}/{activeProducts.length}
            </div>

            {/* Arched Image Carousel (IMAGES ONLY) */}
            <div className="relative w-full h-full flex items-center justify-center min-h-[320px] sm:min-h-[380px] perspective-1200">
              
              {activeProducts.map((product, idx) => {
                const offset = (idx - activeIndex + activeProducts.length) % activeProducts.length;
                let positionClass = '';
                let isVisible = false;

                if (offset === 0) {
                  // Active image: Large, sharp, center focus
                  positionClass = 'translate-x-0 scale-100 opacity-100 z-20 shadow-[0_25px_50px_rgba(11,79,55,0.18)]';
                  isVisible = true;
                } else if (offset === 1) {
                  // Next image preview on right: Smaller, dimmed
                  positionClass = 'translate-x-[48%] sm:translate-x-[78%] scale-75 opacity-40 z-10 blur-[1px]';
                  isVisible = true;
                } else if (offset === activeProducts.length - 1) {
                  // Previous image preview on left: Smaller, dimmed
                  positionClass = '-translate-x-[48%] sm:-translate-x-[78%] scale-75 opacity-40 z-10 blur-[1px]';
                  isVisible = true;
                }

                if (!isVisible) return null;

                const isActive = offset === 0;

                return (
                  <div
                    key={product.id || idx}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(idx);
                        lastInteractionRef.current = Date.now();
                      }
                    }}
                    className={`absolute rounded-t-[120px] sm:rounded-t-[180px] rounded-b-3xl overflow-hidden border-2 transition-cinematic cursor-pointer aspect-[4/5] w-[220px] sm:w-[340px] lg:w-[380px] ${
                      isActive 
                        ? 'border-optom-green ring-4 ring-emerald-300/40 bg-white' 
                        : 'border-slate-300/80 hover:opacity-75 bg-slate-100'
                    } ${positionClass}`}
                  >
                    {/* Pure Image ONLY */}
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover pointer-events-none transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Animatic Light Sheen Sweep Layer for Active Frame */}
                    {isActive && (
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none" />
                    )}

                    {/* Subtle bottom vignette gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}

            </div>

            {/* Bottom Drag Handle Indicator Pill */}
            <div className="absolute bottom-4 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-1.5 z-30 pointer-events-none">
              <MoveHorizontal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Drag or click to explore</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Showcase360;

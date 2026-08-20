import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal, Scan, Sparkles } from 'lucide-react';

const GALLERY_PRODUCTS = [
  {
    id: '01',
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
  },
  {
    id: '02',
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
  },
  {
    id: '03',
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
  },
  {
    id: '04',
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
  },
  {
    id: '05',
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
  },
  {
    id: '06',
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
  },
];

const Showcase360 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [progress, setProgress] = useState(0);

  const lastInteractionRef = useRef(Date.now());

  // Automatic Gallery Timer & Smooth Animatic Progress Line
  useEffect(() => {
    setProgress(0);
    const intervalTime = 50; // Update progress bar every 50ms
    const totalTime = 4500;
    
    const progressTimer = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteractionRef.current;
      if (timeSinceInteraction >= 2000 && !isDragging) {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((old) => (old + 1) % GALLERY_PRODUCTS.length);
            return 0;
          }
          return prev + (intervalTime / totalTime) * 100;
        });
      }
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, [activeIndex, isDragging]);

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
    setActiveIndex((prev) => (prev + 1) % GALLERY_PRODUCTS.length);
    lastInteractionRef.current = Date.now();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_PRODUCTS.length) % GALLERY_PRODUCTS.length);
    lastInteractionRef.current = Date.now();
  };

  const activeProduct = GALLERY_PRODUCTS[activeIndex];

  return (
    <section id="showcase-360" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 overflow-hidden relative border-b border-slate-200/80 select-none">
      
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-3xl pointer-events-none animate-float-optic" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none animate-float-optic" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium White Split Layout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(11,79,55,0.08)] overflow-hidden relative">
          
          {/* ================= LEFT SIDE — ONLY PRODUCT DESCRIPTION CONTENT ================= */}
          <div className="lg:col-span-5 bg-slate-50/70 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 z-20 relative">
            
            {/* Top Animatic Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200/70 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-optom-green to-emerald-400 shadow-[0_0_10px_rgba(11,79,55,0.4)] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-6 pt-2 animate-fadeIn" key={activeIndex}>
              
              {/* Category Badge & Slide Counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-optom-green uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <Scan className="w-3.5 h-3.5 text-optom-maroon animate-pulse" />
                  <span>{activeProduct.category}</span>
                </span>
                <span className="text-xs font-extrabold text-slate-500 font-mono tracking-widest">
                  {activeProduct.code}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-optom-slate-heading tracking-tight leading-tight">
                {activeProduct.title}
              </h2>

              {/* Synchronized Description Lines for Active Image */}
              <div className="space-y-3 text-xs sm:text-sm text-optom-slate-body leading-relaxed font-medium">
                {activeProduct.descriptionLines.map((line, idx) => (
                  <p key={idx} className="flex items-start gap-2.5 group">
                    <span className="w-2 h-2 rounded-full bg-optom-green mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform shadow-xs" />
                    <span>{line}</span>
                  </p>
                ))}
              </div>

            </div>

            {/* Bottom Controls: Arrow Buttons & Indicator Bars */}
            <div className="pt-8 space-y-6">
              
              <div className="flex items-center gap-4">
                {/* Circular Arrow Left */}
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-2xl border border-slate-200 bg-white text-optom-slate-heading hover:bg-optom-green hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none shadow-md group"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Circular Arrow Right */}
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-2xl border border-slate-200 bg-white text-optom-slate-heading hover:bg-optom-green hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none shadow-md group"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Progress Step Bars */}
              <div className="flex items-center gap-2">
                {GALLERY_PRODUCTS.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIndex(idx);
                        lastInteractionRef.current = Date.now();
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'w-14 bg-optom-green shadow-sm ring-2 ring-emerald-300' 
                          : 'w-8 bg-slate-300/80 hover:bg-slate-400'
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
            className="lg:col-span-7 bg-gradient-to-tr from-slate-100/90 via-slate-50 to-emerald-50/30 relative flex items-center justify-center p-6 sm:p-10 overflow-hidden cursor-grab active:cursor-grabbing min-h-[480px]"
            onMouseDown={(e) => handleStartDrag(e.clientX)}
            onMouseMove={(e) => handleMoveDrag(e.clientX)}
            onMouseUp={handleEndDrag}
            onMouseLeave={handleEndDrag}
            onTouchStart={(e) => handleStartDrag(e.touches[0].clientX)}
            onTouchMove={(e) => handleMoveDrag(e.touches[0].clientX)}
            onTouchEnd={handleEndDrag}
          >
            
            {/* Corner Tech Watermarks */}
            <div className="absolute top-4 left-4 font-mono text-[10px] font-extrabold text-optom-green tracking-widest pointer-events-none">
              + OPTIC.360.GALLERY
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] font-extrabold text-slate-500 tracking-widest pointer-events-none">
              POS: {activeIndex + 1}/{GALLERY_PRODUCTS.length}
            </div>

            {/* Arched Image Carousel (IMAGES ONLY) */}
            <div className="relative w-full h-full flex items-center justify-center min-h-[380px] perspective-1200">
              
              {GALLERY_PRODUCTS.map((product, idx) => {
                const offset = (idx - activeIndex + GALLERY_PRODUCTS.length) % GALLERY_PRODUCTS.length;
                let positionClass = '';
                let isVisible = false;

                if (offset === 0) {
                  // Active image: Large, sharp, center focus
                  positionClass = 'translate-x-0 scale-100 opacity-100 z-20 shadow-[0_25px_50px_rgba(11,79,55,0.18)]';
                  isVisible = true;
                } else if (offset === 1) {
                  // Next image preview on right: Smaller, dimmed
                  positionClass = 'translate-x-[68%] sm:translate-x-[78%] scale-75 opacity-40 z-10 blur-[1px]';
                  isVisible = true;
                } else if (offset === GALLERY_PRODUCTS.length - 1) {
                  // Previous image preview on left: Smaller, dimmed
                  positionClass = '-translate-x-[68%] sm:-translate-x-[78%] scale-75 opacity-40 z-10 blur-[1px]';
                  isVisible = true;
                }

                if (!isVisible) return null;

                const isActive = offset === 0;

                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(idx);
                        lastInteractionRef.current = Date.now();
                      }
                    }}
                    className={`absolute rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl overflow-hidden border-2 transition-cinematic cursor-pointer aspect-[4/5] w-[260px] sm:w-[340px] lg:w-[380px] ${
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

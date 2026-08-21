import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getStoredAppealCategories } from '../data/appealCategories';

const EyewearAppeal = ({ onSelectAppealCategory }) => {
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    const all = getStoredAppealCategories();
    const active = all.filter(c => c.isActive);
    setCategories(active.length > 0 ? active : all);
  };

  useEffect(() => {
    loadCategories();

    const handleUpdate = () => {
      loadCategories();
    };
    window.addEventListener('appeal-categories-updated', handleUpdate);
    return () => window.removeEventListener('appeal-categories-updated', handleUpdate);
  }, []);

  const handleCategoryClick = (category) => {
    if (onSelectAppealCategory) {
      onSelectAppealCategory(category);
    }
    const catSection = document.getElementById('categories');
    if (catSection) {
      catSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Dynamic Animated Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl animate-float-optic" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-rose-200/25 blur-3xl animate-float-optic" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-optom-slate-heading tracking-tight">
            Eyewear With Mass Appeal
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-optom-slate-body leading-relaxed font-medium">
            Discover the perfect pair of prescription eyeglasses and sunglasses with our custom fitting collection! Find types of quality glasses from custom-designed acetate to ultra-lightweight titanium.
          </p>
        </div>

        {/* Dynamic Circular Animatic Category Avatars */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 max-w-5xl mx-auto">
          {categories.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => handleCategoryClick(item)}
              className="group flex flex-col items-center focus:outline-none transition-transform duration-500 transform hover:-translate-y-3 animate-float-optic"
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              {/* Outer Animatic Rotating Conic Gradient Ring Container */}
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-slate-200 via-emerald-200 to-rose-200 group-hover:from-optom-green group-hover:via-emerald-400 group-hover:to-rose-500 transition-all duration-700 shadow-md group-hover:shadow-[0_15px_35px_rgba(11,79,55,0.25)]">
                
                {/* Expanding Sonar Ping Ring on Hover */}
                <div className="absolute inset-0 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/20 group-hover:animate-ping transition-all pointer-events-none" />

                {/* Inner Image Frame */}
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative border-2 border-white shadow-inner">
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-115 group-hover:rotate-2 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Animatic Luminous Sheen Light Beam Sweep */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none" />

                  {/* Dark Glass Overlay with Icon Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md text-optom-green border border-white flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-optom-green" />
                    </div>
                  </div>
                </div>

                {/* Corner Sparkle Animatic Indicator */}
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-optom-maroon text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin-slow" />
                </div>
              </div>

              {/* Category Title Below Circle */}
              <div className="mt-2.5 sm:mt-3.5 text-center space-y-0.5 max-w-[110px] sm:max-w-none">
                <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-optom-slate-heading group-hover:text-optom-green transition-colors flex items-center justify-center gap-1 leading-tight">
                  <span>{item.label}</span>
                </h3>
                <span className="text-[10px] sm:text-[11px] font-semibold text-optom-slate-muted block truncate">
                  {item.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EyewearAppeal;

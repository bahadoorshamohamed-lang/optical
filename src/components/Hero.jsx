import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { getStoredHeroSlides } from '../data/heroSlides';

const Hero = ({ onExploreClick }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadActiveSlides = () => {
    const all = getStoredHeroSlides();
    const active = all.filter(s => s.isActive);
    setSlides(active.length > 0 ? active : all);
  };

  useEffect(() => {
    loadActiveSlides();

    // Listen for live updates from Admin Dashboard
    const handleUpdate = () => {
      loadActiveSlides();
    };
    window.addEventListener('hero-slides-updated', handleUpdate);
    return () => window.removeEventListener('hero-slides-updated', handleUpdate);
  }, []);

  // Auto slide picture change every 3 seconds (3000ms)
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-800">
      
      {/* 3-Second Automatic Optical Background Image Slideshow */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[4000ms]`}
          >
            <img
              src={slide.url}
              alt={slide.title || 'Vision Care Background'}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Gray Overlay Gradient for Crisp Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-800/65 to-slate-900/50" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 pt-24 sm:pt-36 pb-10">
        
        {/* Main Headline: Clear Vision. Better Life. */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight shadow-sm">
          Clear Vision.{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-rose-300 mt-1 sm:mt-2">
            Better Life.
          </span>
        </h1>

        {/* Action Button */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl bg-optom-green text-white font-bold text-sm sm:text-base shadow-xl hover:bg-emerald-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-emerald-400/30"
          >
            <span>Explore Our Products</span>
            <ArrowDown className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-bounce" />
          </button>
        </div>

        {/* Slideshow 3-Second Indicator Dots */}
        {slides.length > 1 && (
          <div className="pt-6 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide 
                    ? 'w-8 bg-emerald-400' 
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>

    </section>
  );
};

export default Hero;

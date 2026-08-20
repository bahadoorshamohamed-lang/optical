import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Optical Frames & Eyewear'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1920&q=80',
    title: 'Precision Blue Cut & AR Lenses'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1920&q=80',
    title: 'Advanced Eye Care & Lens Solutions'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1920&q=80',
    title: 'Stylish Handcrafted Acetate Frames'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1920&q=80',
    title: 'Executive & Classic Optical Eyewear'
  }
];

const Hero = ({ onExploreClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide picture change every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-800">
      
      {/* 3-Second Automatic Optical Background Image Slideshow */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[4000ms]`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Gray Overlay Gradient for Crisp Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-800/65 to-slate-900/50" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-20">
        
        {/* Main Headline: Clear Vision. Better Life. */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight shadow-sm">
          Clear Vision.{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-rose-300 mt-2">
            Better Life.
          </span>
        </h1>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-optom-green text-white font-bold text-base shadow-xl hover:bg-emerald-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-emerald-400/30"
          >
            <span>Explore Our Products</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Slideshow 3-Second Indicator Dots */}
        <div className="pt-6 flex items-center justify-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
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

      </div>

    </section>
  );
};

export default Hero;

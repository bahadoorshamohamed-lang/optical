import React, { useState, useEffect } from 'react';
import { Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { getStoredPosters } from '../data/posters';

const OpenPosterModal = ({ forceOpen = false, onClose }) => {
  const [posters, setPosters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Load active posters
  const loadActivePosters = () => {
    const all = getStoredPosters();
    const active = all.filter(p => p.isActive);
    setPosters(active);
    return active;
  };

  useEffect(() => {
    const active = loadActivePosters();
    
    // Check if auto-pop was dismissed in session
    const hasDismissed = sessionStorage.getItem('open_poster_dismissed');
    
    if (forceOpen) {
      setIsOpen(true);
    } else if (active.length > 0 && !hasDismissed) {
      // Auto open on initial load after short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Listen for posters updates from admin
    const handleUpdate = () => {
      loadActivePosters();
    };
    window.addEventListener('posters-updated', handleUpdate);
    return () => window.removeEventListener('posters-updated', handleUpdate);
  }, [forceOpen]);

  // Auto-play slide transition for multiple active posters
  useEffect(() => {
    if (!isOpen || isPaused || posters.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isOpen, isPaused, posters.length]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('open_poster_dismissed', 'true');
    if (onClose) onClose();
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const currentPoster = posters[currentIndex] || posters[0];

  return (
    <>
      {/* Floating Re-Open Badge Button (Visible at bottom-right if active posters exist) */}
      {posters.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-emerald-400/40 shadow-[0_10px_25px_rgba(11,79,55,0.4)] hover:bg-optom-green hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce"
          aria-label="View Open Offer Poster"
        >
          <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white">
            <Tag className="w-4 h-4" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider pr-1">
            Special Store Offers ({posters.length})
          </span>
        </button>
      )}

      {/* Main Pure Image Open Poster Pop-Up Modal */}
      {isOpen && currentPoster && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        >
          
          <div 
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative max-w-4xl max-h-[88vh] bg-transparent rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center group"
          >
            
            {/* Left Navigation Arrow */}
            {posters.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-950/80 text-white hover:bg-optom-green border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer opacity-90 hover:opacity-100"
                aria-label="Previous Offer Poster"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {posters.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-950/80 text-white hover:bg-optom-green border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer opacity-90 hover:opacity-100"
                aria-label="Next Offer Poster"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Pure Poster Image Container */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-white/10 shadow-2xl">
              <a
                href={currentPoster.ctaLink || '#categories'}
                onClick={() => {
                  handleClose();
                  if (currentPoster.ctaLink?.startsWith('#')) {
                    const elem = document.querySelector(currentPoster.ctaLink);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block"
              >
                <img
                  src={currentPoster.imageUrl}
                  alt={`Vision Care Open Poster ${currentIndex + 1}`}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-3xl transition-all duration-500 hover:scale-[1.01]"
                />
              </a>
            </div>

            {/* Dots Indicator if Multiple Posters */}
            {posters.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-3">
                {posters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-7 bg-emerald-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
};

export default OpenPosterModal;

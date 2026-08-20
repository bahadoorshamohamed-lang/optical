import React, { useState } from 'react';
import { RotateCw, Phone, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const VisitingCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="py-12 md:py-16 bg-slate-100 border-b border-slate-200 text-slate-800 overflow-hidden relative">
      
      {/* Decorative Light Radial Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-optom-green border border-emerald-200 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-optom-maroon" />
            Official Business Visiting Card
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-optom-slate-heading tracking-tight">
            Interactive Visiting Card
          </h2>
          <p className="text-xs sm:text-sm text-optom-slate-body">
            Tap or click the card to flip between front branding and clinic address details.
          </p>
        </div>

        {/* 3D Flip Card Container */}
        <div className="perspective-1000 max-w-2xl mx-auto py-4">
          <div
            onClick={handleCardClick}
            className={`relative w-full aspect-[16/9] sm:aspect-[1.8/1] rounded-2xl sm:rounded-3xl cursor-pointer transform-style-3d transition-transform duration-700 ease-out shadow-2xl ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            
            {/* FRONT SIDE: Vision Care Opticals Card */}
            <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-emerald-500/30 backface-hidden shadow-xl group">
              <img
                src="/card-front.png"
                alt="Vision Care Opticals Card Front"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              
              {/* Flip Badge Overlay */}
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-lg group-hover:bg-optom-green group-hover:text-white transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to Flip Address</span>
              </div>
            </div>

            {/* BACK SIDE: Address & Optometrist Info Card */}
            <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-rose-500/30 backface-hidden rotate-y-180 shadow-xl group">
              <img
                src="/card-back.png"
                alt="Abdul Wahab Optometrist Card Back"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Flip Back Badge Overlay */}
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-rose-300 text-[11px] font-bold px-3 py-1.5 rounded-full border border-rose-500/40 flex items-center gap-1.5 shadow-lg group-hover:bg-optom-maroon group-hover:text-white transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to Flip Front</span>
              </div>
            </div>

          </div>
        </div>

        {/* Flip Controls & Direct Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-100 text-optom-green hover:bg-emerald-200 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
          >
            <RotateCw className="w-4 h-4" />
            <span>{isFlipped ? 'Show Front Card' : 'Show Address Card'}</span>
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-optom-green text-white hover:bg-optom-green-hover text-xs font-bold transition-all shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {BUSINESS_INFO.phone}</span>
          </a>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-optom-maroon text-white hover:bg-optom-maroon-hover text-xs font-bold transition-all shadow-xs"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default VisitingCard;

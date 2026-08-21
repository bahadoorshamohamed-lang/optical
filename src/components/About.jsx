import React, { useState, useEffect } from 'react';
import { Glasses, Eye, HeartHandshake, ArrowRight, Quote, Scan, Target } from 'lucide-react';
import { getStoredFramesCollection } from '../data/framesCollection';
import { getStoredCorePurpose } from '../data/corePurpose';

const About = () => {
  const [activeCareIndex, setActiveCareIndex] = useState(0);
  const [hoveredFrameId, setHoveredFrameId] = useState(null);
  
  const [frames, setFrames] = useState(getStoredFramesCollection());
  const [coreItems, setCoreItems] = useState(getStoredCorePurpose());

  useEffect(() => {
    const handleFramesUpdate = (e) => {
      if (e.detail) setFrames(e.detail);
      else setFrames(getStoredFramesCollection());
    };

    const handlePurposeUpdate = (e) => {
      if (e.detail) setCoreItems(e.detail);
      else setCoreItems(getStoredCorePurpose());
    };

    window.addEventListener('frames-collection-updated', handleFramesUpdate);
    window.addEventListener('core-purpose-updated', handlePurposeUpdate);

    return () => {
      window.removeEventListener('frames-collection-updated', handleFramesUpdate);
      window.removeEventListener('core-purpose-updated', handlePurposeUpdate);
    };
  }, []);

  const activeFrames = frames.filter(f => f.isActive !== false);
  const marqueeTrack = activeFrames.length > 0 ? [...activeFrames, ...activeFrames, ...activeFrames] : [];
  const activeCorePurpose = coreItems.filter(c => c.isActive !== false);

  return (
    <div id="about" className="bg-white text-slate-800 overflow-hidden font-sans select-none">
      


      {/* ================= 2. BRAND VISUAL MAGAZINE COMPOSITION ================= */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Overlapping Visual Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none min-h-[340px] sm:min-h-[500px]">
                
                {/* Main Large Image */}
                <div className="w-[82%] rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/5] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=900&q=80"
                    alt="Boutique Eyewear Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Smaller Overlapping Secondary Image */}
                <div className="absolute bottom-2 sm:bottom-4 right-0 w-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-200 z-10 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=700&q=80"
                    alt="Precision Fitting Detail"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Brand Badge */}
                <div className="absolute top-4 sm:top-8 right-4 sm:right-6 bg-slate-900 text-white px-3.5 py-2 sm:px-5 sm:py-3 rounded-2xl border border-slate-700 shadow-2xl z-20">
                  <div className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-emerald-400">VISION CARE</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wider">Optical Excellence</div>
                </div>

              </div>
            </div>

            {/* Right Magazine Editorial Text Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:pl-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-optom-maroon uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-optom-maroon" />
                <span>EXCELLENCE IN OPTICS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-optom-slate-heading tracking-tight leading-tight">
                Crafted for Clarity. <br />
                Styled for Distinction.
              </h2>

              <p className="text-xs sm:text-base text-slate-600 font-light leading-relaxed">
                Founded on the principles of optometric accuracy and boutique eyewear curation, Vision Care Opticals bridges the gap between clinical vision science and personal fashion. Every pair of specs in our collection undergoes stringent fitting tolerances to guarantee optical alignment.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 sm:gap-6 border-t border-slate-200/80">
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-optom-slate-heading">20 / 20</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Refraction Precision</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-optom-green">100%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">UV & HEV Blue Shield</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>




      {/* ================= 4. STATEMENT / QUOTE SECTION ================= */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-slate-200/60 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300 mx-auto opacity-40 mb-4 sm:mb-6" />

         
          <div className="w-16 h-0.5 bg-optom-green mx-auto mt-6 opacity-60" />
          <div className="text-xs font-extrabold text-optom-maroon uppercase tracking-widest mt-4">
            VISION CARE OPTICALS
          </div>

        </div>
      </section>


      {/* ================= 5. LUXURY 3D STAGGERED "OUR FRAMES" MARQUEE (RIGHT TO LEFT) ================= */}
      <section className="py-16 sm:py-24 lg:py-36 bg-white text-slate-800 relative overflow-hidden select-none border-b border-slate-200/80">
        
        {/* Soft Luxury Light Ambient Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none animate-float-optic" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-3xl pointer-events-none animate-float-optic" style={{ animationDelay: '2.5s' }} />

        {/* Center Watermark Editorial Title */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-black text-slate-100/80 tracking-tight select-none uppercase">
            OUR FRAMES
          </h2>
        </div>

        {/* Top Header Tag */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 relative z-30 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-optom-green text-xs font-extrabold uppercase tracking-widest shadow-2xs">
            <Scan className="w-3.5 h-3.5 text-optom-green animate-pulse" />
            <span>OUR FRAMES COLLECTION</span>
          </div>

          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-optom-green animate-ping" />
            Hover any frame to pause & explore details
          </span>
        </div>

        {/* Right-to-Left Continuous Moving Staggered Track (Pauses on Hover) */}
        <div className="relative overflow-hidden py-10 sm:py-16 group z-30">
          
          {/* Side Fade Gradient Masks (White Theme) */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-40 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-40 pointer-events-none" />

          {/* Marquee Track (Pauses on Hover) */}
          <div className="flex items-center gap-6 sm:gap-12 w-max animate-marquee-rtl group-hover:[animation-play-state:paused] transition-all">
            {marqueeTrack.map((item, idx) => {
              const isHovered = hoveredFrameId === `${item.id}-${idx}`;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  onMouseEnter={() => setHoveredFrameId(`${item.id}-${idx}`)}
                  onMouseLeave={() => setHoveredFrameId(null)}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer flex-shrink-0 group/frame ${item.staggerClass || ''} ${
                    isHovered 
                      ? 'scale-110 sm:scale-115 z-50 border-optom-green shadow-2xl ring-2 ring-emerald-300/80 bg-white' 
                      : 'border-slate-200/90 bg-white shadow-md hover:shadow-xl opacity-90 hover:opacity-100'
                  }`}
                  style={{
                    width: window.innerWidth < 640 ? (idx % 2 === 0 ? '180px' : '210px') : (idx % 2 === 0 ? '240px' : '280px'),
                    height: window.innerWidth < 640 ? (idx % 2 === 0 ? '230px' : '270px') : (idx % 2 === 0 ? '300px' : '350px'),
                  }}
                >
                  {/* Frame Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/frame:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Sheen Sweep */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none" />

                  {/* Dark Vignette Overlay (Revealed on Hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover/frame:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Dynamic Frame Name & Category Badge (Revealed ONLY on Hover) */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white z-10 space-y-0.5 sm:space-y-1 transition-all duration-300 transform translate-y-3 opacity-0 group-hover/frame:opacity-100 group-hover/frame:translate-y-0 pointer-events-none">
                    <div className="text-[9px] sm:text-[10px] font-black text-emerald-400 tracking-widest uppercase">
                      {item.category}
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-extrabold tracking-tight text-white group-hover/frame:text-emerald-300 transition-colors">
                      {item.name}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </section>




      {/* ================= 7. IMMERSIVE "CORE PURPOSE" WHITE SECTION ================= */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white text-slate-800 relative overflow-hidden select-none border-b border-slate-200/80">
        
        {/* Soft Ambient Light Spheres */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none animate-float-optic" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-3xl pointer-events-none animate-float-optic" style={{ animationDelay: '2.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-16">
          
          {/* Header Statement */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-xs font-extrabold text-optom-green uppercase tracking-widest px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-2xs">
              CORE PURPOSE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-optom-slate-heading tracking-tight leading-tight">
              Every Frame Has a Purpose. <br />
              <span className="font-extrabold text-optom-green">Every Lens Has a Story.</span>
            </h2>
          </div>

          {/* Interactive Focus Tabs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[380px] sm:min-h-[420px]">
            
            {/* Left Nav Buttons */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              {activeCorePurpose.map((item, idx) => {
                const isActive = idx === Math.min(activeCareIndex, activeCorePurpose.length - 1);

                return (
                  <button
                    key={item.id || idx}
                    onClick={() => setActiveCareIndex(idx)}
                    onMouseEnter={() => setActiveCareIndex(idx)}
                    className={`w-full text-left p-4 sm:p-6 rounded-3xl transition-all duration-500 border flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-md text-optom-slate-heading scale-[1.02]' 
                        : 'bg-white border-slate-200/90 text-slate-500 hover:text-optom-slate-heading hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2.5 sm:p-3 rounded-2xl transition-colors ${isActive ? 'bg-optom-green text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}>
                        <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-serif font-extrabold text-optom-slate-heading">{item.label}</div>
                        <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{item.tagline}</div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive ? 'text-optom-green translate-x-1' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Active Focus Preview Card */}
            {activeCorePurpose.length > 0 && (
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl aspect-[16/10] sm:aspect-[16/9] group">
                  <img
                    src={activeCorePurpose[Math.min(activeCareIndex, activeCorePurpose.length - 1)].bgImage}
                    alt={activeCorePurpose[Math.min(activeCareIndex, activeCorePurpose.length - 1)].label}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 space-y-3 z-10">
                    <span className="text-xs font-extrabold text-white uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/90 border border-emerald-400 shadow-xs inline-block">
                      {activeCorePurpose[Math.min(activeCareIndex, activeCorePurpose.length - 1)].label} Focus
                    </span>
                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      {activeCorePurpose[Math.min(activeCareIndex, activeCorePurpose.length - 1)].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;

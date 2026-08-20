import React, { useState, useRef } from 'react';
import { RotateCw, Phone, MapPin, ExternalLink, Sparkles, Scan, MoveHorizontal, CheckCircle2, ShieldCheck, ZoomIn, ZoomOut, Cpu, Sliders, Eye } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

// Optical Frame Details for 3D Try-On Studio
const FRAME_SPECS = {
  'Classic Black': {
    weight: '12g Light',
    material: 'Bio-Cellulose Acetate',
    coating: 'AR Multi-Coated',
    blueShield: '98% HEV Filter',
    pd: '64 mm',
    strokeColor: '#0f172a',
    bridgeColor: '#1e293b',
    templeColor: '#0f172a',
    strokeWidth: '6',
    lensTint: 'bg-emerald-500/12 mix-blend-overlay',
    description: 'Timeless architectural black frame with anti-glare clarity.'
  },
  
};

const VisitingCard = () => {
  // Right side 3D Flip Card State
  const [isFlipped, setIsFlipped] = useState(false);

  // Left side Interactive 3D Try-On State & Logic
  const [sliderPos, setSliderPos] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFrameStyle, setActiveFrameStyle] = useState('Classic Black');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('68 Facial Landmarks Tracked');
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, 1.25 = zoomed in
  const [tryOnMode, setTryOnMode] = useState('model'); // 'model' or 'cam'

  const containerRef = useRef(null);

  const currentSpec = FRAME_SPECS[activeFrameStyle] || FRAME_SPECS['Classic Black'];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 10) percentage = 10;
    if (percentage > 90) percentage = 90;
    setSliderPos(percentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const triggerScanEffect = (styleName = activeFrameStyle) => {
    setActiveFrameStyle(styleName);
    setIsScanning(true);
    setScanMessage(`Calibrating ${styleName} Optics...`);
    
    setTimeout(() => {
      setScanMessage(`3D AR PD: ${FRAME_SPECS[styleName].pd} Aligned`);
    }, 900);

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('68 Facial Landmarks Tracked');
    }, 1800);
  };

  const toggleZoom = () => {
    setZoomLevel(zoomLevel === 1 ? 1.25 : 1);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 border-b border-slate-200/80 text-slate-800 overflow-hidden relative">
      
      {/* Decorative Ambient Radial Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-200/35 blur-3xl animate-float-optic" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl animate-float-optic" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-optom-green border border-emerald-200 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-optom-maroon animate-pulse" />
            <span>Interactive Optical Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-optom-slate-heading tracking-tight leading-tight">
            3D Virtual Try-On & Official Visiting Card
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-optom-slate-body leading-relaxed font-medium">
            Test interactive 3D virtual eyewear fitting on the left, and flip the official business card on the right to view clinic address details.
          </p>
        </div>

        {/* 2-Column Luxury Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ================= LEFT SIDE: INTERACTIVE 3D VIRTUAL TRY-ON STUDIO ================= */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/90 shadow-2xl hover:shadow-[0_20px_50px_rgba(11,79,55,0.12)] transition-all duration-500 flex flex-col justify-between space-y-5">
            
            {/* Top Badge & Live AR HUD Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-optom-green flex items-center gap-1.5">
                  <Scan className="w-4 h-4 text-emerald-600" /> 3D Virtual Try-On Studio
                </span>
              </div>

              {/* Dynamic HUD Status Tag */}
              <div className="text-[11px] font-extrabold text-optom-slate-heading bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-optom-green" />
                <span>{scanMessage}</span>
              </div>
            </div>

            {/* Interactive Split Canvas Viewport */}
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none border-2 border-slate-200/90 shadow-2xl group bg-slate-950"
            >
              {/* 1. UNCORRECTED PRESCRIPTION VISION (LEFT SIDE - BLURRED) */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-500 pointer-events-none"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                }}
              >
                <img 
                  src="/tryon-man.png" 
                  alt="Uncorrected Blur Vision"
                  className="w-full h-full object-cover filter blur-[5px] contrast-[0.92] brightness-[0.95]"
                />
                
               
              </div>

              {/* 2. VCO HD PRECISION OPTICS (RIGHT SIDE - CRYSTAL CLEAR FIXED IMAGE) */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-500 pointer-events-none"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  clipPath: `inset(0 0 0 ${sliderPos}%)`
                }}
              >
                <img 
                  src="/tryon-man.png" 
                  alt="VCO HD Precision Optics Clear"
                  className="w-full h-full object-cover filter blur-0 contrast-[1.12] brightness-[1.04]"
                />
                
                {/* Dynamic Optical Lens Tint Overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${currentSpec.lensTint}`} />

                
              </div>

              {/* HIGH-TECH AR CORNER HUD OVERLAY */}
              <div className="absolute inset-4 pointer-events-none z-10 flex flex-col justify-between">
                <div className="flex justify-between items-center text-emerald-400 font-mono text-[11px] font-extrabold tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  <span>+ AR.RETICLE.3D</span>
                  <span className="mr-12">POS: {Math.round(sliderPos)}%</span>
                </div>
                <div className="flex justify-between items-end text-slate-300/90 font-mono text-[11px] font-extrabold tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  <span className="opacity-0">HIDDEN</span>
                  <span>INDEX: 1.67 HD</span>
                </div>
              </div>

              {/* LASER SCAN ANIMATION LAYER */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  <div className="w-full h-1 bg-emerald-400 shadow-[0_0_25px_#34d399] animate-beam-scan top-1/2" />
                  <div className="absolute inset-0 bg-emerald-500/15 animate-pulse" />
                </div>
              )}

              {/* NEON DRAG HANDLE VERTICAL DIVIDER LINE */}
              <div 
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-300 shadow-[0_0_14px_#34d399] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-7 h-11 rounded-full bg-white text-optom-green border-2 border-emerald-500 flex items-center justify-center shadow-2xl transform -translate-x-1/2 ring-4 ring-emerald-400/30">
                  <MoveHorizontal className="w-4 h-4 text-emerald-600 animate-pulse" />
                </div>
              </div>

              {/* Top Right Zoom Toggle Button */}
              <button 
                onClick={toggleZoom}
                className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-2xl bg-slate-900/85 backdrop-blur-md text-white border border-white/20 hover:bg-optom-green transition-all shadow-xl flex items-center justify-center transform hover:scale-105 active:scale-95"
                title={zoomLevel === 1 ? 'Zoom to Eye View' : 'Reset Zoom'}
              >
                {zoomLevel === 1 ? <ZoomIn className="w-4.5 h-4.5" /> : <ZoomOut className="w-4.5 h-4.5 text-emerald-300" />}
              </button>

              {/* Bottom Drag Instructions Pill */}
              <div className="absolute bottom-3.5 left-3.5 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Drag slider to test 3D fit</span>
              </div>
            </div>

            {/* LIVE AR SPECS HUD DATA CARD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Weight</span>
                <span className="text-xs font-extrabold text-optom-slate-heading">{currentSpec.weight}</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Material</span>
                <span className="text-xs font-extrabold text-optom-green truncate block px-1">{currentSpec.material}</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Protection</span>
                <span className="text-xs font-extrabold text-optom-maroon">{currentSpec.blueShield}</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Pupil Distance</span>
                <span className="text-xs font-extrabold text-slate-800">{currentSpec.pd}</span>
              </div>
            </div>

            {/* Interactive Frame Style Controls & Scan Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-optom-green" /> Style:
                </span>
                {['Classic Black'].map((style) => {
                  const isActive = activeFrameStyle === style;
                  return (
                    <button
                      key={style}
                      onClick={() => triggerScanEffect(style)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-300 shadow-2xs ${
                        isActive
                          ? 'bg-optom-green text-white shadow-md ring-2 ring-emerald-300 scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => triggerScanEffect(activeFrameStyle)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-optom-maroon text-white text-xs font-extrabold hover:bg-optom-maroon-hover transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Scan className="w-4 h-4" />
                <span>Test AR Fit</span>
              </button>
            </div>

          </div>


          {/* ================= RIGHT SIDE: INTERACTIVE 3D FLIP BUSINESS VISITING CARD ================= */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/90 shadow-2xl hover:shadow-[0_20px_50px_rgba(144,26,30,0.12)] transition-all duration-500 flex flex-col justify-between space-y-5">
            
            {/* Top Badge Strip */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-rose-100 text-optom-maroon">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-optom-maroon">
                  Official Business Card
                </span>
              </div>
              
              <span className="text-[11px] font-extrabold text-optom-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                {isFlipped ? 'Back: Clinic Address' : 'Front: VCO Branding'}
              </span>
            </div>

            {/* 3D Flip Card Frame */}
            <div className="perspective-1200 w-full py-2 my-auto">
              <div
                onClick={handleCardClick}
                className={`relative w-full aspect-[16/9.5] rounded-2xl sm:rounded-3xl cursor-pointer transform-style-3d transition-transform duration-700 ease-out shadow-2xl group ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-emerald-500/30 backface-hidden shadow-xl group-hover:border-emerald-500 transition-colors">
                  <img
                    src="/card-front.png"
                    alt="Vision Care Opticals Card Front"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Subtle Light Glare Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Flip Badge Overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-lg group-hover:bg-optom-green group-hover:text-white transition-colors">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Tap to Flip Address</span>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-rose-500/30 backface-hidden rotate-y-180 shadow-xl group-hover:border-rose-500 transition-colors">
                  <img
                    src="/card-back.png"
                    alt="Abdul Wahab Optometrist Card Back"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* Subtle Light Glare Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Flip Back Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-rose-300 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full border border-rose-500/40 flex items-center gap-1.5 shadow-lg group-hover:bg-optom-maroon group-hover:text-white transition-colors">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Tap to Flip Front</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={handleCardClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-optom-green hover:bg-emerald-200 border border-emerald-300 text-xs font-extrabold transition-all shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Show Front' : 'Show Address'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-optom-green text-white hover:bg-optom-green-hover text-xs font-extrabold transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-optom-maroon text-white hover:bg-optom-maroon-hover text-xs font-extrabold transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VisitingCard;

import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import TopBar from './TopBar';
import { Phone, MapPin, PhoneCall, ExternalLink, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showPhonePopover, setShowPhonePopover] = useState(false);
  const [showLocationPopover, setShowLocationPopover] = useState(false);

  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background style threshold
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY <= 20) {
        // At top of page: SHOW BOTH TOPBAR & NAVBAR
        setTopBarVisible(true);
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN: HIDE BOTH TOPBAR & NAVBAR
        setTopBarVisible(false);
        setNavbarVisible(false);
        setShowPhonePopover(false);
        setShowLocationPopover(false);
      } else {
        // Scrolling UP: SHOW ONLY TOP BAR, HIDE NAVBAR
        setTopBarVisible(true);
        setNavbarVisible(false);
        setShowPhonePopover(false);
        setShowLocationPopover(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneRef.current && !phoneRef.current.contains(event.target)) {
        setShowPhonePopover(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePhone = () => {
    setShowPhonePopover(!showPhonePopover);
    setShowLocationPopover(false);
  };

  const toggleLocation = () => {
    setShowLocationPopover(!showLocationPopover);
    setShowPhonePopover(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
      {/* Top Utility & Contact Info Announcement Bar */}
      <div className={`pointer-events-auto transition-all duration-300 transform ${
        topBarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <TopBar />
      </div>

      {/* Main Transparent / Glass Navigation Header */}
      <div className={`pointer-events-auto transition-all duration-300 transform ${
        navbarVisible ? 'translate-y-0 opacity-100 max-h-32' : '-translate-y-full opacity-0 max-h-0 overflow-hidden'
      } ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10 py-2.5' 
          : 'bg-gradient-to-b from-slate-950/70 via-slate-900/30 to-transparent py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Uploaded VCO Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-xl p-0.5 inline-block"
            >
              <Logo className="h-10 sm:h-14 md:h-16" />
            </a>

            {/* Right: Phone & Location Icon Buttons with Interactive Popovers */}
            <div className="flex items-center gap-2 sm:gap-4 relative">
              
              {/* Phone Icon & Popover */}
              <div className="relative group" ref={phoneRef}>
                <button
                  onClick={togglePhone}
                  className={`relative p-2.5 sm:p-3.5 rounded-2xl transition-all duration-500 focus:outline-none ${
                    showPhonePopover 
                      ? 'bg-gradient-to-br from-emerald-500 to-optom-green text-white ring-4 ring-emerald-400/40 scale-105 shadow-[0_0_25px_rgba(16,185,129,0.45)]' 
                      : 'bg-slate-900/80 backdrop-blur-xl text-emerald-400 border border-emerald-500/30 hover:border-emerald-400/80 hover:bg-emerald-600 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 shadow-md'
                  }`}
                  aria-label="Phone Direct Contact"
                  title="Phone Contact"
                >
                  <Phone className="w-4.5 h-4.5 sm:w-6 sm:h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Status Indicator Ping Dot */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
                </button>

                {/* Phone Popover Dropdown Card */}
                {showPhonePopover && (
                  <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-72 max-w-xs bg-white/95 backdrop-blur-xl rounded-3xl shadow-modal border border-slate-200/90 p-4 sm:p-5 text-slate-800 animate-fadeIn z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-optom-green flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-emerald-500 animate-pulse" /> Contact Direct
                      </span>
                      <button 
                        onClick={() => setShowPhonePopover(false)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optometrist Direct Line</div>
                        <div className="text-lg sm:text-xl font-extrabold text-optom-slate-heading tracking-tight mt-0.5">
                          +91 {BUSINESS_INFO.phone}
                        </div>
                      </div>

                      <a
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-optom-green text-white font-extrabold text-xs uppercase tracking-wider hover:bg-optom-green-hover transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Now ({BUSINESS_INFO.phone})</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Icon & Popover */}
              <div className="relative group" ref={locationRef}>
                <button
                  onClick={toggleLocation}
                  className={`relative p-2.5 sm:p-3.5 rounded-2xl transition-all duration-500 focus:outline-none ${
                    showLocationPopover 
                      ? 'bg-gradient-to-br from-rose-600 to-optom-maroon text-white ring-4 ring-rose-400/40 scale-105 shadow-[0_0_25px_rgba(244,63,94,0.45)]' 
                      : 'bg-slate-900/80 backdrop-blur-xl text-rose-400 border border-rose-500/30 hover:border-rose-400/80 hover:bg-optom-maroon hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:-translate-y-0.5 shadow-md'
                  }`}
                  aria-label="Location Map Address"
                  title="Clinic Location"
                >
                  <MapPin className="w-4.5 h-4.5 sm:w-6 sm:h-6 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Status Indicator Ping Dot */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-rose-500 border-2 border-slate-900"></span>
                  </span>
                </button>

                {/* Location Popover Dropdown Card */}
                {showLocationPopover && (
                  <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-80 max-w-xs bg-white/95 backdrop-blur-xl rounded-3xl shadow-modal border border-slate-200/90 p-4 sm:p-5 text-slate-800 animate-fadeIn z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-optom-maroon flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-rose-500 animate-bounce" /> Clinic Location
                      </span>
                      <button 
                        onClick={() => setShowLocationPopover(false)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <address className="not-italic text-xs text-slate-600 leading-relaxed font-medium">
                        {BUSINESS_INFO.addressLine1}<br />
                        {BUSINESS_INFO.addressLine2}<br />
                        <strong className="text-optom-slate-heading font-extrabold block mt-1">{BUSINESS_INFO.cityStatePincode}</strong>
                      </address>

                      <div className="pt-1 flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-optom-maroon text-white text-xs font-extrabold uppercase tracking-wider hover:bg-optom-maroon-hover transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            setShowLocationPopover(false);
                            const contactSec = document.getElementById('contact');
                            if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-extrabold hover:bg-slate-200 transition-colors"
                        >
                          View Section
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { Phone, MapPin, PhoneCall, ExternalLink, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPhonePopover, setShowPhonePopover] = useState(false);
  const [showLocationPopover, setShowLocationPopover] = useState(false);

  const phoneRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-white/10 py-2.5' 
        : 'bg-transparent py-4'
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
            className="focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-xl p-1 inline-block"
          >
            <Logo className="h-12 sm:h-14 md:h-16" />
          </a>

          {/* Right: Phone & Location Icon Buttons with Interactive Popovers */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            
            {/* Phone Icon & Popover */}
            <div className="relative" ref={phoneRef}>
              <button
                onClick={togglePhone}
                className={`p-3 rounded-full transition-all duration-300 shadow-md ${
                  showPhonePopover 
                    ? 'bg-optom-maroon text-white ring-2 ring-rose-300' 
                    : 'bg-white/90 backdrop-blur-md text-optom-green hover:bg-optom-green hover:text-white border border-slate-200/80'
                }`}
                aria-label="Show Phone Number"
                title="Click to view phone number"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Phone Popover Dropdown Card */}
              {showPhonePopover && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-modal border border-slate-200 p-4 text-slate-800 animate-fadeIn z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-optom-maroon flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4" /> Direct Phone Contact
                    </span>
                    <button 
                      onClick={() => setShowPhonePopover(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">Optometrist Inquiry</div>
                      <div className="text-xl font-extrabold text-optom-green tracking-tight">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>

                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-optom-green text-white font-bold text-xs hover:bg-optom-green-hover transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now ({BUSINESS_INFO.phone})</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Location Icon & Popover */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={toggleLocation}
                className={`p-3 rounded-full transition-all duration-300 shadow-md ${
                  showLocationPopover 
                    ? 'bg-optom-maroon text-white ring-2 ring-rose-300' 
                    : 'bg-white/90 backdrop-blur-md text-optom-maroon hover:bg-optom-maroon hover:text-white border border-slate-200/80'
                }`}
                aria-label="Show Location Address"
                title="Click to view clinic location"
              >
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Location Popover Dropdown Card */}
              {showLocationPopover && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-modal border border-slate-200 p-4 text-slate-800 animate-fadeIn z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-optom-green flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500" /> Clinic Location
                    </span>
                    <button 
                      onClick={() => setShowLocationPopover(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <address className="not-italic text-xs text-slate-700 leading-relaxed font-medium">
                      {BUSINESS_INFO.addressLine1}<br />
                      {BUSINESS_INFO.addressLine2}<br />
                      <strong className="text-optom-green font-extrabold">{BUSINESS_INFO.cityStatePincode}</strong>
                    </address>

                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-optom-maroon text-white text-xs font-bold hover:bg-optom-maroon-hover transition-colors shadow-xs"
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
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
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
    </header>
  );
};

export default Navbar;

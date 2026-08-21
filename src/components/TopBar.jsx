import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Clock, Sparkles } from 'lucide-react';
import { getStoredTopBarData } from '../data/siteConfig';

const TopBar = () => {
  const [data, setData] = useState(getStoredTopBarData());

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setData(e.detail);
      } else {
        setData(getStoredTopBarData());
      }
    };

    window.addEventListener('topbar-updated', handleUpdate);
    return () => window.removeEventListener('topbar-updated', handleUpdate);
  }, []);

  if (!data.isTopBarVisible) return null;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 border-b border-white/10 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Left Side: Contact Phone & Location */}
        <div className="flex items-center gap-2 sm:gap-6">
          <a 
            href={`tel:${data.phone}`}
            className="flex items-center gap-1 hover:text-emerald-400 transition-colors font-bold tracking-tight"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
            <span>+91 {data.phone}</span>
          </a>

          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address + ', ' + data.cityPincode)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-medium truncate max-w-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            <span className="truncate">{data.address}, {data.cityPincode}</span>
          </a>
        </div>

        {/* Center Badge: Doctor Credentials & Tagline */}
        <div className="hidden lg:flex items-center gap-2 font-extrabold text-[11px] uppercase tracking-wider text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Vision Care Opticals</span>
          <span className="text-slate-500 font-normal">|</span>
          <span className="text-slate-300 font-semibold lowercase capitalize">{data.tagline}</span>
        </div>

        {/* Right Side: Timings & Email */}
        <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold">
          <div className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
            <span>{data.workingHours}</span>
          </div>

          {data.email && (
            <a 
              href={`mailto:${data.email}`}
              className="hidden xl:flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{data.email}</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default TopBar;

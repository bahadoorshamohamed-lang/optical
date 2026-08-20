import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { ShieldCheck, Lock } from 'lucide-react';
import { getStoredFooterData } from '../data/siteConfig';

const Footer = ({ onNavClick, onOpenAdmin, isAdminLoggedIn }) => {
  const [footerData, setFooterData] = useState(getStoredFooterData());

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setFooterData(e.detail);
      } else {
        setFooterData(getStoredFooterData());
      }
    };

    window.addEventListener('footer-updated', handleUpdate);
    return () => window.removeEventListener('footer-updated', handleUpdate);
  }, []);

  return (
    <footer className="bg-slate-800 text-slate-300 pt-12 pb-10 border-t-4 border-optom-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Column */}
          <div className="space-y-2 text-center md:text-left">
            <Logo className="h-12 mx-auto md:mx-0" />
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {footerData.aboutText}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            <button 
              onClick={() => onNavClick('home')}
              className="hover:text-emerald-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onNavClick('eye-solutions')}
              className="hover:text-emerald-400 transition-colors"
            >
              Eye Solutions
            </button>
            <button 
              onClick={() => onNavClick('lenses')}
              className="hover:text-emerald-400 transition-colors"
            >
              Lenses Collection
            </button>
            <button 
              onClick={() => onNavClick('frames')}
              className="hover:text-emerald-400 transition-colors"
            >
              Frames Showcase
            </button>
            <button 
              onClick={() => onNavClick('about')}
              className="hover:text-emerald-400 transition-colors"
            >
              About Showcase
            </button>
            <button 
              onClick={onOpenAdmin}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
            >
              {isAdminLoggedIn ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isAdminLoggedIn ? "Admin Dashboard" : "Admin Login"}</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {footerData.copyrightText}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{footerData.tagline}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

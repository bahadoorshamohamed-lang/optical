import React, { useEffect } from 'react';
import { X, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Container */}
      <div className="relative bg-white rounded-3xl shadow-modal border border-slate-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 flex flex-col my-auto">
        
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-optom-green"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-optom-slate-muted">
              Optical Showcase Catalogue Detail
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-optom-slate-heading hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-optom-green"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Section */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 border border-slate-200/80 shadow-inner">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-optom-green text-white shadow-md">
                    {product.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-optom-green flex-shrink-0" />
                <div className="text-xs text-optom-slate-heading">
                  <span className="font-bold block">100% Quality Verified</span>
                  <span>Inspected & prescribed by Abdul Wahab B.Sc. Optom.</span>
                </div>
              </div>
            </div>

            {/* Right Information Section */}
            <div className="md:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-semibold text-optom-maroon uppercase tracking-widest block mb-1">
                  Product Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-optom-slate-heading">
                  {product.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-optom-slate-body leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Features List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-optom-slate-heading">
                  Key Advantages & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-optom-slate-heading p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-optom-green flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              {product.specifications && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-optom-slate-heading">
                    Technical Specifications
                  </h4>
                  <div className="rounded-xl border border-slate-200/80 overflow-hidden text-xs divide-y divide-slate-100">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <div key={idx} className="grid grid-cols-12 p-3 bg-white hover:bg-slate-50/50">
                        <span className="col-span-5 font-semibold text-optom-slate-heading">{key}:</span>
                        <span className="col-span-7 text-optom-slate-body">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* In-Store Experience Notice Banner (Replaces any E-commerce) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-optom-green text-white space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  In-Store Optical Consultation & Fitting
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  To view, test fit, or select custom prescription power for this product, please visit our clinic in Thanjavur. Abdul Wahab B.Sc. Optom. provides personalized optical measurements and eye exams.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-emerald-100">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{BUSINESS_INFO.addressLine1} {BUSINESS_INFO.cityStatePincode}</span>
                </span>
              </div>
              <a 
                href={`tel:${BUSINESS_INFO.phone}`} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-optom-maroon text-white font-bold hover:bg-optom-maroon-hover transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-optom-slate-muted">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Product Showcase Only — No Online Cart or Booking</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-optom-slate-heading text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Close / Back to Showcase
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;

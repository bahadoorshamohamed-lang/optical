import React, { useEffect } from 'react';
import { X, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';

const ProductModal = ({ product, onClose, onSelectBrand }) => {
  const img1 = product?.imageUrl && product.imageUrl.trim();
  const img2 = (product?.hoverImageUrl || product?.secondaryImageUrl || product?.hoverImage) && (product.hoverImageUrl || product.secondaryImageUrl || product.hoverImage).trim();

  const primarySrc = img1 || img2 || DEFAULT_FALLBACK_IMAGE;
  const secondSrc = (img1 && img2 && img1 !== img2) ? img2 : null;

  const [activeImage, setActiveImage] = React.useState(primarySrc);

  useEffect(() => {
    setActiveImage(primarySrc);
  }, [product, primarySrc]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-scaleUp my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-950 transition-colors shadow-md focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Image Showcase Section */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 border border-slate-200/80 shadow-inner group">
                <img
                  src={activeImage || DEFAULT_FALLBACK_IMAGE}
                  alt={product.name}
                  onError={() => setActiveImage(DEFAULT_FALLBACK_IMAGE)}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-optom-green text-white shadow-md">
                    {product.categoryLabel}
                  </span>
                  {product.brand && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectBrand) onSelectBrand(product.brand);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-amber-300 border border-amber-400/40 shadow-md hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
                      title={`View all ${product.brand} products`}
                    >
                      {product.brand}
                    </button>
                  )}
                </div>
              </div>

              {/* 2 Photos Thumbnail Switcher if 2nd image available */}
              {secondSrc && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Product Photos (2 Views):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveImage(img1)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                        activeImage === img1 
                          ? 'border-optom-green ring-2 ring-emerald-300 scale-102' 
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img1} alt="Photo 1" className="w-full h-full object-cover rounded-lg" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-900/80 text-white">
                        Photo 1 (Front)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveImage(secondSrc)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                        activeImage === secondSrc 
                          ? 'border-optom-green ring-2 ring-emerald-300 scale-102' 
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={secondSrc} alt="Photo 2" className="w-full h-full object-cover rounded-lg" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-900/80 text-emerald-400">
                        Photo 2 (Hover View)
                      </span>
                    </button>
                  </div>
                </div>
              )}

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
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-optom-maroon uppercase tracking-widest block">
                    Product Overview
                  </span>
                  {product.brand && (
                    <span className="text-xs font-black text-amber-700 bg-amber-100 border border-amber-300/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Brand: {product.brand}
                    </span>
                  )}
                </div>
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

import React, { useState, useEffect } from 'react';
import { Glasses, ImageOff } from 'lucide-react';

const ProductCard = ({ product, onSelectBrand, onClick }) => {
  const img1 = product?.imageUrl && product.imageUrl.trim();
  const img2 = (product?.hoverImageUrl || product?.secondaryImageUrl || product?.hoverImage) && (product.hoverImageUrl || product.secondaryImageUrl || product.hoverImage).trim();
  
  const primarySrc = img1 || img2 || null;
  const hoverSrcVal = (img1 && img2 && img1 !== img2) ? img2 : null;

  const [mainSrc, setMainSrc] = useState(primarySrc);
  const [hoverSrc, setHoverSrc] = useState(hoverSrcVal);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setMainSrc(primarySrc);
    setHoverSrc(hoverSrcVal);
    setHasImageError(!primarySrc);
  }, [product?.imageUrl, product?.hoverImageUrl, product?.secondaryImageUrl, product?.hoverImage, primarySrc, hoverSrcVal]);

  const getCategoryFallback = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c === 'sunglasses') return 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80';
    if (c === 'lenses') return 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80';
    if (c === 'eye-solutions') return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
    if (c === 'kids') return 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
  };

  const handleMainImgError = () => {
    const fallback = getCategoryFallback(product?.category);
    if (mainSrc !== fallback) {
      setMainSrc(fallback);
    } else {
      setHasImageError(true);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1.5 aspect-[4/3] sm:aspect-square flex items-center justify-center bg-slate-50"
      title={`View details for ${product?.name}`}
    >
      {/* Primary Optical Product Image or Clean Placeholder */}
      {mainSrc && !hasImageError ? (
        <>
          <img
            src={mainSrc}
            alt={product?.name || 'Optical Product'}
            onError={handleMainImgError}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              hoverSrc 
                ? 'group-hover:opacity-0 group-hover:scale-105' 
                : 'group-hover:scale-110'
            }`}
            loading="lazy"
          />

          {/* 2nd Hover Image (Uploaded by Admin) */}
          {hoverSrc && (
            <img
              src={hoverSrc}
              alt={`${product?.name} - Hover View`}
              onError={() => setHoverSrc(null)}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              loading="lazy"
            />
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-400 group-hover:text-amber-400 transition-colors duration-500">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-amber-400/40 transition-all duration-500 shadow-inner">
            <Glasses className="w-7 h-7 text-amber-400/80 group-hover:text-amber-300" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-amber-300 transition-colors">
            No Image Uploaded
          </span>
        </div>
      )}

      {/* Brand Badge Top-Left */}
      {product?.brand && (
        <div className="absolute top-3 left-3 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectBrand) onSelectBrand(product.brand);
            }}
            className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-950/85 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer transform active:scale-95"
            title={`Filter by brand: ${product.brand}`}
          >
            {product.brand}
          </button>
        </div>
      )}

      {/* Product Title Label Overlay Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white pointer-events-none z-10">
        <h4 className="text-[11px] sm:text-xs font-bold font-serif line-clamp-1 text-white shadow-xs">
          {product?.name}
        </h4>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          {product?.categoryLabel && (
            <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider block font-mono truncate">
              {product.categoryLabel}
            </span>
          )}
          {product?.brand && (
            <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider block font-mono truncate">
              {product.brand}
            </span>
          )}
        </div>
      </div>

      {/* Subtle Gradient Sheen Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Continuous Shimmer Light Effect */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* 2nd View Badge Indicator */}
      {hoverSrc && !hasImageError && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-md">
            2nd View
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

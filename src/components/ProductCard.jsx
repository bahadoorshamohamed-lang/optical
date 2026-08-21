import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  const hoverImage = product.hoverImageUrl || product.secondaryImageUrl || product.hoverImage;

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1.5 aspect-[4/3] sm:aspect-square flex items-center justify-center bg-slate-50"
      title={product.name}
    >
      {/* Primary Optical Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          hoverImage 
            ? 'group-hover:opacity-0 group-hover:scale-105' 
            : 'group-hover:scale-110'
        }`}
        loading="lazy"
      />

      {/* 2nd Hover Image (Uploaded by Admin) */}
      {hoverImage && (
        <img
          src={hoverImage}
          alt={`${product.name} - Hover View`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          loading="lazy"
        />
      )}

      {/* Subtle Gradient Sheen Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Continuous Shimmer Light Effect */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* 2nd View Badge Indicator */}
      {hoverImage && (
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

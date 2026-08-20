import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1.5 aspect-[4/3] sm:aspect-square flex items-center justify-center bg-slate-50"
      title={product.name}
    >
      {/* High-Resolution Optical Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Subtle Gradient Sheen Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Continuous Shimmer Light Effect */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer-sheen pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ProductCard;

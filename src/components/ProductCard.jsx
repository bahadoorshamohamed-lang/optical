import React from 'react';
import { Eye, Info, Sparkles } from 'lucide-react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Header with Badge Overlay */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-optom-green shadow-xs border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-optom-maroon"></span>
            {product.categoryLabel}
          </span>
        </div>

        {/* Action Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-optom-green text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            <span>View Full Details</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-optom-slate-heading group-hover:text-optom-green transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-optom-slate-body leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Feature Tags List */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.features.slice(0, 3).map((feature, idx) => (
            <span 
              key={idx} 
              className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-optom-slate-body border border-slate-200/60"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 3 && (
            <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-optom-green">
              +{product.features.length - 3} more
            </span>
          )}
        </div>

        {/* Bottom Card Footer Action Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-optom-maroon flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            In-Store Catalogue
          </span>
          <button 
            type="button"
            className="text-xs font-bold text-optom-green group-hover:text-optom-green-hover flex items-center gap-1"
          >
            <span>Details</span>
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

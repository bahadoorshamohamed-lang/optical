import React from 'react';

const Logo = ({ className = "h-14 sm:h-16" }) => {
  return (
    <div className="flex items-center select-none">
      <img
        src="/logo.png"
        alt="VCO Optical Logo"
        className={`${className} object-contain transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );
};

export default Logo;

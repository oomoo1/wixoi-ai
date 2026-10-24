import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => {
  const iconBox =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const textSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-[22px]';

  return (
    <div className="inline-flex items-center gap-3 group select-none">
      {/* Exact Calligraphic Mark from Image 1 with subtle sapphire side-glow */}
      <div
        className={`relative ${iconBox} rounded-xl bg-[#050B1C] border border-white/15 flex items-center justify-center shadow-[0_0_24px_rgba(100,206,251,0.18)] group-hover:border-[#64CEFB]/60 transition-all duration-300 overflow-hidden`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 via-transparent to-[#64CEFB]/20 opacity-80"
        />
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 relative z-10"
          aria-hidden="true"
        >
          {/* Main Organic Brush Stroke (Left-bottom sweeping up to peak and down-right) */}
          <path
            d="M10 45 C18 40, 27 33, 34 26.5 C38.5 33, 42 40.5, 45.5 47"
            stroke="#FFFFFF"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Top-Right Calligraphic Hook Stroke */}
          <path
            d="M38.5 13.5 C40 19.5, 41 24.5, 43.2 25.5 C46 26.5, 50 22.5, 53 19.5"
            stroke="#64CEFB"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Pure Brand Name: Wixoi AI */}
      <span
        className={`font-display font-bold tracking-tight text-white ${textSize} leading-none`}
      >
        Wixoi AI
      </span>
    </div>
  );
};

export default BrandLogo;

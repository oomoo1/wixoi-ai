import React from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '' }) => {
  return (
    <span
      className={`inline-block text-[var(--accent-highlight)] font-semibold ${className}`}
    >
      {text}
    </span>
  );
};

export default ShinyText;

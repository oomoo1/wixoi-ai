import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '' }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(105deg, #FFFFFF 0%, #BAE6FD 28%, #64CEFB 48%, #FFFFFF 55%, #60A5FA 75%, #FFFFFF 100%)',
        backgroundSize: '220% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      animate={reduceMotion ? undefined : { backgroundPosition: ['200% 0%', '-200% 0%'] }}
      transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;

import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicWord,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignment} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-highlight)] animate-pulse" />
          <span className="font-metadata-mono text-[var(--accent-highlight)] text-xs tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="font-heading-section text-white font-bold tracking-tight mb-4 text-balance">
        {title}{' '}
        {italicWord && (
          <span className="font-serif italic font-normal text-[var(--accent-highlight)] px-1">
            {italicWord}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="font-body-editorial text-[var(--text-secondary)] mx-auto text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

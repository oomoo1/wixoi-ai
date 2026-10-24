import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { HERO_PROOF_POINTS } from '../../content/site';

export interface HeroProps {
  onExploreWorkflows?: () => void;
  onBookReview?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWorkflows,
  onBookReview,
}) => {
  const [canLoadVideo] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;
    const isDesktop = window.innerWidth >= 1024;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    return Boolean(isDesktop && !prefersReducedMotion && !connection?.saveData);
  });

  return (
    <section
      className="relative min-h-dvh flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Hero Overview"
    >
      {/* Section-Local Subtle Ambient Glow (Max opacity 0.15, zero fixed curtains) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,rgba(100,206,251,0.06)_45%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-highlight)] animate-pulse" />
          <span className="font-metadata-mono text-xs text-[var(--accent-highlight)] tracking-wider">
            AI workflows for US teams of 10–100
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-tight mb-6 text-balance max-w-4xl">
          Turn repetitive admin into{' '}
          <span className="font-serif italic font-normal text-[var(--accent-highlight)] block sm:inline">
            reliable workflows.
          </span>
        </h1>

        {/* Supporting Copy (55-68ch) */}
        <p className="font-body-editorial text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto text-pretty">
          Wixoi builds four focused workflows inside your CRM, Google Sheets,
          and Google Docs—then trains your team live to run them with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Button
            asAnchor
            href="#booking"
            size="lg"
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={onBookReview}
            className="w-full sm:w-auto"
          >
            Book a free 30-minute workflow review
          </Button>

          <Button
            asAnchor
            href="#services"
            size="lg"
            variant="outline"
            icon={<ChevronDown className="w-4 h-4" />}
            onClick={onExploreWorkflows}
            className="w-full sm:w-auto"
          >
            Explore the four workflows
          </Button>
        </div>

        {/* Concrete Hero Proof Strip */}
        <div className="w-full max-w-4xl pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {HERO_PROOF_POINTS.map((point) => (
            <div
              key={point}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-highlight)] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Conditional Video / Lightweight Static Poster Component */}
        <div className="mt-14 w-full max-w-4xl rounded-2xl border border-white/10 bg-[var(--surface-raised)]/60 overflow-hidden shadow-2xl relative">
          {canLoadVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/apple-touch-icon.png"
              className="w-full h-auto object-cover max-h-[380px]"
            >
              <source src="/assets/hero-loop.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-white/[0.04] to-transparent">
              <div className="font-metadata-mono text-xs text-[var(--accent-highlight)] mb-2">
                Operational Architecture
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Four Systems. Zero Guesswork.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
                Deterministic Google Workspace integrations with human validation checkpoints on every ambiguous record.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

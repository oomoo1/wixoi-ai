import React, { useState, useEffect, useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { SITE_CONFIG } from '../../content/site';
import {
  Calendar,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Lock,
  Video,
} from 'lucide-react';

export interface BookingProps {
  capacitySummary?: string;
}

export const Booking: React.FC<BookingProps> = ({ capacitySummary }) => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-load Cal.com embed only when near viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const expectationCards = [
    {
      title: 'What happens?',
      icon: <HelpCircle className="w-4 h-4 text-[var(--accent-highlight)]" />,
      detail: 'We identify one repetitive bottleneck and assess workflow fit.',
    },
    {
      title: 'What should I bring?',
      icon: <CheckCircle2 className="w-4 h-4 text-[var(--accent-highlight)]" />,
      detail: 'Nothing required; a redacted example is helpful if available.',
    },
    {
      title: 'What happens next?',
      icon: <Calendar className="w-4 h-4 text-[var(--accent-highlight)]" />,
      detail: 'You leave with a recommended next step, even if that is not a pilot.',
    },
  ];

  return (
    <section
      id="booking"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-page)] relative border-t border-white/[0.08]"
      aria-label="Schedule a Workflow Review"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="No-Obligation Consultation"
          title="Schedule your 30-minute"
          italicWord="workflow review."
          subtitle="A focused conversation with an automation engineer. We map out one specific bottleneck and demonstrate how a custom workflow would resolve it."
        />

        {/* Expectation Cards Strip (Exact CRO Requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {expectationCards.map((card) => (
            <div
              key={card.title}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-white/[0.05] shrink-0 mt-0.5">
                {card.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {card.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capacity Model Prefill Banner if available */}
        {capacitySummary && (
          <div className="mb-6 p-4 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-highlight)]/30 text-xs sm:text-sm text-white flex items-center justify-between gap-4">
            <span className="font-mono text-[var(--accent-highlight)]">
              {capacitySummary}
            </span>
            <span className="text-xs text-white/60 shrink-0">
              Attached to review agenda
            </span>
          </div>
        )}

        {/* Meeting Specs Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[var(--accent-highlight)]" />
            <span>Google Meet</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--accent-highlight)]" />
            <span>30 Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[var(--accent-highlight)]" />
            <span className="text-white/90">
              Mutual NDA before client file access
            </span>
          </div>
        </div>

        {/* Scheduler Container */}
        <Card className="p-2 sm:p-4 overflow-hidden border border-white/15 bg-black/40">
          {shouldLoadIframe ? (
            <iframe
              src={SITE_CONFIG.calBookingUrl}
              title="Cal.com Review Scheduler"
              className="w-full h-[620px] rounded-xl border-0 bg-transparent"
              loading="lazy"
            />
          ) : (
            <div className="h-[620px] flex flex-col items-center justify-center text-center p-8">
              <Calendar className="w-10 h-10 text-[var(--accent-highlight)] mb-4 animate-pulse" />
              <h4 className="text-lg font-bold text-white mb-2">
                Loading Interactive Scheduler...
              </h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mb-6">
                Direct calendar connection to book your 30-minute Google Meet workflow review.
              </p>
              <a
                href={SITE_CONFIG.calBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-highlight)] underline underline-offset-4"
              >
                <span>Open direct scheduler link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Direct link fallback */}
          <div className="pt-3 pb-2 text-center border-t border-white/[0.06] text-xs text-[var(--text-secondary)]">
            Trouble viewing calendar?{' '}
            <a
              href={SITE_CONFIG.calBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent-highlight)] hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>Open in new window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Booking;

import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../BrandLogo';
import { NAV_LINKS, SITE_CONFIG } from '../../content/site';
import { Button } from '../ui/Button';
import { Menu, X, ArrowRight } from 'lucide-react';

export interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Trap focus or prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface-page)]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo link */}
        <a
          href="#"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] rounded-lg p-1"
          aria-label={`${SITE_CONFIG.name} Home`}
        >
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asAnchor
            href="#booking"
            size="sm"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onOpenBooking}
          >
            Book a Review
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[var(--surface-page)]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation Links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-white/90 hover:text-[var(--accent-highlight)] transition-colors py-2 border-b border-white/[0.06]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <Button
              asAnchor
              href="#booking"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
            >
              Book a Free Review
            </Button>
            <p className="text-xs text-center text-[var(--text-secondary)]">
              Mutual NDA executed before file review.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

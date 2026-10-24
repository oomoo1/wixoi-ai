import React from 'react';
import { BrandLogo } from '../BrandLogo';
import { SITE_CONFIG, NAV_LINKS } from '../../content/site';
import { WORKFLOWS } from '../../content/services';
import { ShieldCheck, Mail } from 'lucide-react';

export interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'security') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[var(--surface-page)] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <BrandLogo size="md" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Quiet operational precision. We build four focused workflows
              inside your existing CRM, Sheets, and Docs.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] pt-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-highlight)] shrink-0" />
              <span>Mutual NDA before client file access</span>
            </div>
          </div>

          {/* Workflows */}
          <div>
            <h4 className="font-metadata-mono text-xs text-[var(--accent-highlight)] mb-4 tracking-wider">
              Workflows
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {WORKFLOWS.map((wf) => (
                <li key={wf.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    {wf.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-metadata-mono text-xs text-[var(--accent-highlight)] mb-4 tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-metadata-mono text-xs text-[var(--accent-highlight)] mb-4 tracking-wider">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('security')}
                  className="hover:text-white transition-colors text-left"
                >
                  Security & Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy (Zero Model Training)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© 2026 Wixoi. All rights reserved.</p>
          <p className="text-white/40">
            Engineered for US businesses of 10–100 employees.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

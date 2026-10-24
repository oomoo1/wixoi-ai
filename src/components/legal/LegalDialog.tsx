import React, { useEffect, useRef } from 'react';
import { LEGAL_DOCS } from '../../content/legal';
import { X, Shield } from 'lucide-react';

export interface LegalDialogProps {
  type: 'privacy' | 'terms' | 'security' | null;
  onClose: () => void;
}

export const LegalDialog: React.FC<LegalDialogProps> = ({ type, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!type) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const doc = LEGAL_DOCS[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[var(--surface-raised)] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)]/20 border border-[var(--accent-highlight)]/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[var(--accent-highlight)]" />
            </div>
            <div>
              <h3 id="legal-dialog-title" className="text-lg font-bold text-white">
                {doc.title}
              </h3>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                Last updated: {doc.lastUpdated}
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
          {doc.sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-base font-semibold text-white">
                {section.title}
              </h4>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold touch-target transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalDialog;

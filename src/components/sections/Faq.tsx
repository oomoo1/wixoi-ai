import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ChevronDown, ShieldCheck } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Do you train AI models on our proprietary business data?',
    answer:
      'Never. We configure enterprise-grade foundation models and cloud APIs with strict zero-data-retention policies. Your company files, customer records, and internal notes are never used for model training or retained by third parties.',
  },
  {
    question: 'Do we need to migrate to a new software platform?',
    answer:
      'No. We do not build closed secondary platforms. Our workflows connect natively to your existing Google Workspace (Sheets, Docs, Drive, Gmail) and CRM (HubSpot, Salesforce). Your team continues working where they already operate.',
  },
  {
    question: 'What happens when an invoice or document has ambiguous data?',
    answer:
      'Every workflow features deterministic human-in-the-loop safeguards. If a total fails mathematical reconciliation or a required field is missing, the system does not guess. It leaves the field blank (null) and alerts your team for review.',
  },
  {
    question: 'How does the initial engagement begin?',
    answer:
      'We start with a free 30-minute workflow review where we evaluate your specific bottleneck. If there is mutual fit, we sign a Mutual NDA and run a short pilot on a sample of 10–20 redacted records before any production rollout.',
  },
  {
    question: 'Is team training included, or just technical setup?',
    answer:
      'Live team training is an essential deliverable in every engagement. We run recorded screen-share walkthroughs with your actual operators and provide concise cheat-sheets so your team can confidently own and supervise the workflow.',
  },
];

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-page)] relative"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Security & Governance"
          title="Clear operational"
          italicWord="answers."
          subtitle="Everything you need to know regarding data privacy, security guarantees, system compatibility, and team enablement."
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--accent-highlight)] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-white/[0.04]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* NDA Banner */}
        <div className="mt-12 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-3 text-xs sm:text-sm text-white/90">
          <ShieldCheck className="w-5 h-5 text-[var(--accent-highlight)] shrink-0" />
          <span>
            <strong>Mutual NDA standard:</strong> Executed prior to reviewing any proprietary client files or databases.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Faq;

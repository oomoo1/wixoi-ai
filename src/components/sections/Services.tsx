import React from 'react';
import { WORKFLOWS } from '../../content/services';
import type { WorkflowItem } from '../../content/services';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { ArrowUpRight, Check, Layers } from 'lucide-react';

export interface ServicesProps {
  onSelectWorkflow: (tabIndex: number) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectWorkflow }) => {
  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[var(--surface-page)]"
      aria-label="Core Workflows"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Focused Architecture"
          title="Four workflows built inside"
          italicWord="your existing stack."
          subtitle="We do not ask your team to adopt another complicated SaaS platform. We integrate these automations directly into your CRM, Google Sheets, and Google Docs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORKFLOWS.map((workflow: WorkflowItem) => (
            <Card
              key={workflow.id}
              interactive
              className="flex flex-col justify-between group cursor-pointer"
              onClick={() => {
                onSelectWorkflow(workflow.tabIndex);
                const el = document.getElementById('demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-metadata-mono text-xs text-[var(--accent-highlight)] px-3 py-1 rounded-full bg-[var(--accent-highlight)]/10 border border-[var(--accent-highlight)]/20">
                    {workflow.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] group-hover:text-white transition-colors">
                    <span>Inspect Demo</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--accent-highlight)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[var(--accent-highlight)] transition-colors">
                  {workflow.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {workflow.shortDescription}
                </p>

                {/* Flow preview */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                  {workflow.flowSteps.slice(0, 2).map((step) => (
                    <div
                      key={step.stepNumber}
                      className="flex items-start gap-2.5 text-xs text-white/80"
                    >
                      <Check className="w-3.5 h-3.5 text-[var(--accent-highlight)] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white font-medium">
                          {step.title}:
                        </strong>{' '}
                        {step.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools row & Deliverable */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Layers className="w-3.5 h-3.5 text-[var(--accent-highlight)]" />
                  <span>Integrates:</span>
                  {workflow.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded bg-white/[0.05] text-white/90 font-mono text-[11px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[var(--accent-highlight)]">
                  Illustrative synthetic data
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

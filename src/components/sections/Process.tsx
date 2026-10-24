import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Search, Hammer, GraduationCap, RefreshCw } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Sample Audit',
      timeframe: 'Day 1–3',
      icon: <Search className="w-5 h-5 text-[var(--accent-highlight)]" />,
      description:
        'We review 10–20 redacted sample files or records to verify document structures, schema consistency, and automation feasibility before any code is committed.',
    },
    {
      step: '02',
      title: 'Pilot Build',
      timeframe: 'Day 4–10',
      icon: <Hammer className="w-5 h-5 text-[var(--accent-highlight)]" />,
      description:
        'We construct the workflow in an isolated sandbox or dedicated Google Drive folder, calibrating extraction rules and setting up human validation checkpoints.',
    },
    {
      step: '03',
      title: 'Live Team Training',
      timeframe: 'Day 11–14',
      icon: <GraduationCap className="w-5 h-5 text-[var(--accent-highlight)]" />,
      description:
        'We run live, recorded screen-share training sessions with your actual operations staff. We teach your team how to run, review, and override outputs.',
    },
    {
      step: '04',
      title: 'Ongoing Operation',
      timeframe: 'Production',
      icon: <RefreshCw className="w-5 h-5 text-[var(--accent-highlight)]" />,
      description:
        'Your staff runs the workflow inside existing tools. Ambiguous fields and edge cases trigger clear review flags, maintaining complete human oversight.',
    },
  ];

  return (
    <section
      id="process"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-page)] relative"
      aria-label="How Engagement Works"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The Engagement Model"
          title="From sample audit to"
          italicWord="confident operation."
          subtitle="No open-ended consulting retainers. We follow a clear four-phase deployment that ensures your staff fully understands every workflow."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <Card key={s.step} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="font-metadata-mono text-xs text-[var(--accent-highlight)] px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                    {s.timeframe}
                  </span>
                </div>

                <div className="font-metadata-mono text-xs text-[var(--text-secondary)] mb-1">
                  Step {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-[var(--accent-highlight)]">
                Guaranteed handover docs
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

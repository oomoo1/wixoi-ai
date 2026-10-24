import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { SliderField } from '../ui/SliderField';
import { Button } from '../ui/Button';
import {
  calculateCapacity,
  CAPACITY_DEFAULTS,
  CAPACITY_BOUNDS,
} from '../../lib/capacity';
import type { CapacityInputs } from '../../lib/capacity';
import { ArrowRight, Clock, Info, Sparkles } from 'lucide-react';

export interface CapacityCalculatorProps {
  onApplyToBooking?: (summary: string) => void;
}

export const CapacityCalculator: React.FC<CapacityCalculatorProps> = ({
  onApplyToBooking,
}) => {
  const [inputs, setInputs] = useState<CapacityInputs>(CAPACITY_DEFAULTS);

  const outputs = calculateCapacity(inputs);

  const updateInput = <K extends keyof CapacityInputs>(
    key: K,
    val: CapacityInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleApply = () => {
    const summary = `Modeled Capacity: ${inputs.teamSize} team members, recovering ~${outputs.recoverableAnnualHours.toLocaleString()} annual hours (~$${outputs.recoverableAnnualValue.toLocaleString()} payroll value).`;
    if (onApplyToBooking) {
      onApplyToBooking(summary);
    }
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="calculator"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-raised)]/30 relative border-t border-white/[0.06]"
      aria-label="Operational Capacity Model"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Realistic Economic Assessment"
          title="Model your team's recoverable"
          italicWord="operational capacity."
          subtitle="We do not make inflated ROI claims. Estimate how many hours your team currently spends on repetitive admin, and model recoverable capacity based on realistic adoption constraints."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Numeric Inputs (7 cols) */}
          <Card className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                Operational Baseline & Scope Inputs
              </h3>
              <span className="font-metadata-mono text-xs text-[var(--accent-highlight)]">
                Dynamic Model
              </span>
            </div>

            <SliderField
              id="team-size"
              label="Team Size (Capped 10–100)"
              helperText="Staff members who interact with CRM, docs, or invoices"
              value={inputs.teamSize}
              min={CAPACITY_BOUNDS.teamSize.min}
              max={CAPACITY_BOUNDS.teamSize.max}
              step={CAPACITY_BOUNDS.teamSize.step}
              unitSuffix=" staff"
              onChange={(v) => updateInput('teamSize', v)}
            />

            <SliderField
              id="hours-per-week"
              label="Admin Hours Per Person / Week"
              helperText="Time spent copying data, sorting records, or formatting notes"
              value={inputs.hoursPerWeek}
              min={CAPACITY_BOUNDS.hoursPerWeek.min}
              max={CAPACITY_BOUNDS.hoursPerWeek.max}
              step={CAPACITY_BOUNDS.hoursPerWeek.step}
              unitSuffix=" hrs/wk"
              onChange={(v) => updateInput('hoursPerWeek', v)}
            />

            <SliderField
              id="hourly-cost"
              label="Blended Hourly Payroll Cost"
              helperText="Fully burdened hourly rate (salary + taxes + benefits)"
              value={inputs.hourlyCost}
              min={CAPACITY_BOUNDS.hourlyCost.min}
              max={CAPACITY_BOUNDS.hourlyCost.max}
              step={CAPACITY_BOUNDS.hourlyCost.step}
              unitPrefix="$"
              unitSuffix="/hr"
              onChange={(v) => updateInput('hourlyCost', v)}
            />

            <div className="pt-4 border-t border-white/10 space-y-6">
              <SliderField
                id="addressable-share"
                label="Workflow Addressable Share"
                helperText="Portion of admin tasks fitting our 4 specific workflows"
                value={Math.round(inputs.addressableShare * 100)}
                min={Math.round(CAPACITY_BOUNDS.addressableShare.min * 100)}
                max={Math.round(CAPACITY_BOUNDS.addressableShare.max * 100)}
                step={5}
                unitSuffix="%"
                onChange={(v) => updateInput('addressableShare', v / 100)}
              />

              <SliderField
                id="expected-adoption"
                label="Realistic Team Adoption Rate"
                helperText="Percentage of staff actively operating the workflows post-training"
                value={Math.round(inputs.expectedAdoption * 100)}
                min={Math.round(CAPACITY_BOUNDS.expectedAdoption.min * 100)}
                max={Math.round(CAPACITY_BOUNDS.expectedAdoption.max * 100)}
                step={5}
                unitSuffix="%"
                onChange={(v) => updateInput('expectedAdoption', v / 100)}
              />
            </div>
          </Card>

          {/* Right Column: Comparison Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-[var(--radius-card)] bg-gradient-to-br from-[#0A1633] via-[#050D20] to-[#020510] border border-[var(--accent-highlight)]/30 shadow-[0_20px_50px_rgba(37,99,235,0.25)] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-metadata-mono text-xs text-[var(--accent-highlight)] tracking-wider">
                  Capacity Assessment
                </span>
                <span className="font-mono text-xs text-white/50">48 wks/yr</span>
              </div>

              {/* Current Manual Effort */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-[var(--text-secondary)]">
                  Current Manual Effort (Baseline)
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-xl font-bold text-white">
                    {outputs.grossAnnualHours.toLocaleString()} hrs/year
                  </div>
                  <div className="text-sm font-mono text-white/60">
                    ${outputs.grossAnnualCost.toLocaleString()}
                  </div>
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Total gross payroll hours currently consumed by repetitive routine tasks.
                </div>
              </div>

              {/* Modeled Recoverable Capacity */}
              <div className="p-5 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-highlight)]/40 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent-highlight)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modeled Recoverable Capacity</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {outputs.recoverableAnnualHours.toLocaleString()}
                  <span className="text-lg text-[var(--accent-highlight)] font-normal ml-2">
                    hrs / year
                  </span>
                </div>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  ${outputs.recoverableAnnualValue.toLocaleString()}
                  <span className="text-xs text-white/70 font-normal ml-1.5">
                    payroll capacity unlocked
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-highlight)]" />
                    Per Person:
                  </span>
                  <span className="font-semibold text-white">
                    ~{outputs.weeklyHoursPerPersonRecovered} hrs / week recovered
                  </span>
                </div>
              </div>

              {/* CTA to Booking */}
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleApply}
              >
                Pass modeled numbers to review
              </Button>

              {/* Required Mathematical Disclaimer */}
              <div className="flex items-start gap-2 pt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <Info className="w-4 h-4 shrink-0 text-white/40 mt-0.5" />
                <span>
                  Illustrative model based on your inputs. It is not a savings guarantee or a forecast of cash savings.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapacityCalculator;

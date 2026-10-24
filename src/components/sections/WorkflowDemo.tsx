import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import {
  WORKFLOWS,
  SYNTHETIC_CRM_CONTACTS,
  SYNTHETIC_MEETING_TRANSCRIPT,
  SYNTHETIC_MEETING_ITEMS,
  SYNTHETIC_INVOICE_ROWS,
  SYNTHETIC_QUOTE_DATA,
  SYNTHETIC_WEEKLY_DIGEST,
} from '../../content/services';
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Users,
} from 'lucide-react';

export interface WorkflowDemoProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const WorkflowDemo: React.FC<WorkflowDemoProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  // WAI-ARIA Left / Right Arrow Key Navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % WORKFLOWS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + WORKFLOWS.length) % WORKFLOWS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = WORKFLOWS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    onTabChange(nextIndex);
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (buttons && buttons[nextIndex]) {
      buttons[nextIndex].focus();
    }
  };

  return (
    <section
      id="demo"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-raised)]/40 relative border-t border-b border-white/[0.06]"
      aria-label="Interactive Workflow Transformation"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Artifact-Led Proof"
          title="See real workflow outputs"
          italicWord="before we build."
          subtitle="We believe in tangible artifacts over vague promises. Examine the exact structural outputs produced by our four core systems."
        />

        {/* Accessible WAI-ARIA Tablist */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Workflow transformation demonstrations"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
        >
          {WORKFLOWS.map((wf, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={wf.id}
                role="tab"
                id={`tab-${wf.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${wf.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onTabChange(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap touch-target select-none ${
                  isSelected
                    ? 'bg-[var(--accent-highlight)] text-black shadow-[0_0_20px_rgba(100,206,251,0.35)]'
                    : 'bg-white/[0.05] text-[var(--text-secondary)] hover:text-white hover:bg-white/10'
                }`}
              >
                {wf.badge}: {wf.title.split('&')[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Global Synthetic Label Notice */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-highlight)]" />
            <span>Illustrative workflow output using synthetic data.</span>
          </div>
          <span className="text-xs font-mono text-white/50 hidden sm:inline">
            Interactive Artifact Inspection
          </span>
        </div>

        {/* Tab Panels */}
        <div className="relative min-h-[500px]">
          {/* TAB 0: CRM LEAD RANKING */}
          <div
            id={`panel-${WORKFLOWS[0].id}`}
            role="tabpanel"
            aria-labelledby={`tab-${WORKFLOWS[0].id}`}
            hidden={activeTab !== 0}
          >
            {activeTab === 0 && (
              <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[var(--accent-highlight)]" />
                      Priority Contacts & Icebreakers (HubSpot / Sheets)
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Five sample contacts scored for intent, deduplicated, with contextual opening lines.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs self-start sm:self-auto">
                    Live Score Engine
                  </span>
                </div>

                <div className="space-y-3">
                  {SYNTHETIC_CRM_CONTACTS.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-highlight)] flex items-center justify-center font-mono text-xs font-bold">
                            {contact.fitScore}
                          </span>
                          <div>
                            <span className="font-semibold text-white text-sm">
                              {contact.name}
                            </span>
                            <span className="text-xs text-[var(--text-secondary)] ml-2">
                              {contact.role} · {contact.company}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 self-start sm:self-auto">
                          {contact.duplicateResolution}
                        </span>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] mb-2">
                        <strong className="text-white/80">Priority Rationale:</strong>{' '}
                        {contact.priorityRationale}
                      </p>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05] text-xs font-mono text-[var(--accent-highlight)] flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Suggested Opener: &ldquo;{contact.suggestedOpener}&rdquo;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* TAB 1: MEETING SUMMARIES */}
          <div
            id={`panel-${WORKFLOWS[1].id}`}
            role="tabpanel"
            aria-labelledby={`tab-${WORKFLOWS[1].id}`}
            hidden={activeTab !== 1}
          >
            {activeTab === 1 && (
              <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[var(--accent-highlight)]" />
                      Transcript Excerpt to Structured Decisions (Docs / Slack)
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Raw recorded speech parsed into assigned action items with deadlines.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs self-start sm:self-auto">
                    Speaker Separated
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Raw Transcript Excerpt */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08]">
                    <span className="font-metadata-mono text-xs text-[var(--text-secondary)] block mb-3">
                      Raw Intake Excerpt (Google Meet Cloud Audio)
                    </span>
                    <pre className="font-mono text-xs text-white/80 whitespace-pre-wrap leading-relaxed">
                      {SYNTHETIC_MEETING_TRANSCRIPT}
                    </pre>
                  </div>

                  {/* Right: Extracted Decisions & Owners */}
                  <div className="space-y-3">
                    <span className="font-metadata-mono text-xs text-[var(--accent-highlight)] block mb-1">
                      Extracted Action Items & Owners
                    </span>
                    {SYNTHETIC_MEETING_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">
                            {item.decision}
                          </span>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                              item.status === 'Committed'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] pt-1 font-mono">
                          <span>Owner: {item.owner}</span>
                          <span>Due: {item.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* TAB 2: PDF DATA EXTRACTION */}
          <div
            id={`panel-${WORKFLOWS[2].id}`}
            role="tabpanel"
            aria-labelledby={`tab-${WORKFLOWS[2].id}`}
            hidden={activeTab !== 2}
          >
            {activeTab === 2 && (
              <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-[var(--accent-highlight)]" />
                      PDF Extraction Ledger (Google Sheets Integration)
                    </h3>
                    <p className="text-xs text-[var(--accent-highlight)] font-medium mt-1">
                      Structured rows, blank missing fields, and exceptions flagged for review.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs self-start sm:self-auto">
                    Human Checkpoint Active
                  </span>
                </div>

                {/* Ledger Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.04] text-[var(--text-secondary)] font-mono">
                        <th className="p-3">Invoice #</th>
                        <th className="p-3">Vendor</th>
                        <th className="p-3">PO Number</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Subtotal</th>
                        <th className="p-3">Tax</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] font-mono">
                      {SYNTHETIC_INVOICE_ROWS.map((row) => (
                        <tr
                          key={row.invoiceNumber}
                          className={row.flaggedReviewNotice ? 'bg-amber-500/[0.04]' : ''}
                        >
                          <td className="p-3 font-semibold text-white">
                            {row.invoiceNumber}
                          </td>
                          <td className="p-3 text-white/90">{row.vendor}</td>
                          <td className="p-3">
                            {row.poNumber ? (
                              <span className="text-white">{row.poNumber}</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-[10px]">
                                null (Blank - Missing)
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-[var(--text-secondary)]">
                            {row.dueDate}
                          </td>
                          <td className="p-3 text-white/80">{row.subtotal}</td>
                          <td className="p-3 text-white/80">{row.tax}</td>
                          <td className="p-3 font-semibold text-white">
                            {row.total}
                          </td>
                          <td className="p-3">
                            {row.flaggedReviewNotice ? (
                              <div className="flex items-center gap-1.5 text-amber-300">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-[10px] max-w-[200px] truncate">
                                  Flagged: {row.flaggedReviewNotice}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-[10px]">Reconciled</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs text-[var(--text-secondary)] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Validation Safeguard:</strong> Wixoi does not force speculative numbers. Missing fields (like PO Number in invoice INV-2026-882) are logged as blank nulls, and tax discrepancies trigger an immediate manager review notification.
                  </span>
                </div>
              </Card>
            )}
          </div>

          {/* TAB 3: AUTOMATED QUOTES & OPS DIGEST */}
          <div
            id={`panel-${WORKFLOWS[3].id}`}
            role="tabpanel"
            aria-labelledby={`tab-${WORKFLOWS[3].id}`}
            hidden={activeTab !== 3}
          >
            {activeTab === 3 && (
              <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[var(--accent-highlight)]" />
                      Quote Approval Checkpoint & Friday Ops Digest
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      1-click quote review UI paired with an automated end-of-week executive briefing.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs self-start sm:self-auto">
                    Weekly Routine
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Quote Approval Checkpoint */}
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-metadata-mono text-xs text-[var(--accent-highlight)]">
                        Intake Quote Checkpoint
                      </span>
                      <span className="font-mono text-xs text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {SYNTHETIC_QUOTE_DATA.approvalStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="text-white font-semibold text-sm">
                        {SYNTHETIC_QUOTE_DATA.client}
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        Scope: {SYNTHETIC_QUOTE_DATA.scopeSummary}
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        Tier: {SYNTHETIC_QUOTE_DATA.calculatedTier}
                      </div>
                      <div className="text-lg font-bold text-[var(--accent-highlight)] pt-2">
                        {SYNTHETIC_QUOTE_DATA.estimatedTotal}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                      >
                        1-Click Approve Quote
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors"
                      >
                        Adjust Line Items
                      </button>
                    </div>
                  </div>

                  {/* Right: Friday Ops Digest */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-metadata-mono text-xs text-[var(--text-secondary)]">
                        Friday Executive Summary
                      </span>
                      <span className="font-mono text-xs text-white/60">
                        {SYNTHETIC_WEEKLY_DIGEST.reportDate}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-[var(--text-secondary)]">Quotes Delivered</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {SYNTHETIC_WEEKLY_DIGEST.quotesGenerated}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-[var(--text-secondary)]">Acceptance Rate</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">
                          {SYNTHETIC_WEEKLY_DIGEST.acceptanceRate}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-[var(--text-secondary)]">Invoices Processed</div>
                        <div className="text-xl font-bold text-white mt-1">
                          {SYNTHETIC_WEEKLY_DIGEST.invoicesProcessed}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-[var(--text-secondary)]">Hours Reclaimed</div>
                        <div className="text-xl font-bold text-[var(--accent-highlight)] mt-1">
                          {SYNTHETIC_WEEKLY_DIGEST.hoursReclaimed}h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowDemo;

export interface SyntheticContact {
  id: string;
  name: string;
  company: string;
  role: string;
  fitScore: number;
  duplicateResolution: 'Merged with record #402' | 'Unique primary lead' | 'Cleaned domain alias';
  priorityRationale: string;
  suggestedOpener: string;
}

export interface SyntheticMeetingItem {
  id: string;
  decision: string;
  owner: string;
  deadline: string;
  priority: 'Immediate' | 'Next Sprint' | 'Ongoing';
  status: 'Committed' | 'Needs Review';
}

export interface SyntheticInvoiceRow {
  invoiceNumber: string;
  vendor: string;
  dueDate: string;
  subtotal: string;
  tax: string;
  total: string;
  poNumber: string | null; // explicitly nullable for missing field requirement
  flaggedReviewNotice?: string; // explicitly flagged exception requirement
}

export interface SyntheticQuoteData {
  quoteId: string;
  client: string;
  scopeSummary: string;
  lineItemsCount: number;
  calculatedTier: string;
  estimatedTotal: string;
  approvalStatus: 'Pending Review' | 'Approved' | 'Adjusted';
}

export interface SyntheticWeeklyDigest {
  reportDate: string;
  quotesGenerated: number;
  acceptanceRate: string;
  invoicesProcessed: number;
  hoursReclaimed: number;
  exceptionsFlagged: number;
  openFollowUps: number;
}

export interface WorkflowItem {
  id: string;
  tabIndex: number;
  badge: string;
  title: string;
  shortDescription: string;
  deliverable: string;
  tools: string[];
  flowSteps: Array<{ stepNumber: number; title: string; detail: string }>;
}

export const WORKFLOWS: WorkflowItem[] = [
  {
    id: 'crm-lead-ranking',
    tabIndex: 0,
    badge: 'Workflow 01',
    title: 'CRM Lead Ranking & Priority Outreach',
    shortDescription:
      'Clean contact lists, prioritize contacts worth a call this week, and suggest opening lines.',
    deliverable: 'A daily prioritized list in your CRM with fresh research context and context-aware icebreakers.',
    tools: ['HubSpot', 'Salesforce', 'Google Sheets', 'Clay'],
    flowSteps: [
      { stepNumber: 1, title: 'Ingest & Deduplicate', detail: 'Consolidate multiple sheet exports and resolve messy contact duplicates automatically.' },
      { stepNumber: 2, title: 'Score Fit & Intent', detail: 'Evaluate company size, tech stack, and intent signals against your ideal customer profile.' },
      { stepNumber: 3, title: 'Flag Priority Accounts', detail: 'Rank the top 15% highest-propensity accounts for immediate rep outreach.' },
      { stepNumber: 4, title: 'Draft Suggested Openers', detail: 'Produce a custom 2-sentence conversation starter grounded in recent company news.' },
    ],
  },
  {
    id: 'meeting-summaries',
    tabIndex: 1,
    badge: 'Workflow 02',
    title: 'Meeting Action Extractor & Executive Briefs',
    shortDescription:
      'Call recordings become transcripts, executive summaries, and action items with owners in Google Docs.',
    deliverable: 'Structured Google Doc briefs synced directly to Slack 10 minutes after calls end.',
    tools: ['Google Meet', 'Zoom', 'Google Docs', 'Slack'],
    flowSteps: [
      { stepNumber: 1, title: 'Audio & Transcript Intake', detail: 'Receive raw cloud recordings or meeting transcripts right as calls conclude.' },
      { stepNumber: 2, title: 'Speaker & Context Separation', detail: 'Distinguish client requests from internal discussions and commitments.' },
      { stepNumber: 3, title: 'Extract Decisions & Owners', detail: 'Isolate exact deliverables, assignees, deadlines, and dependencies.' },
      { stepNumber: 4, title: 'Publish Briefs & Slack Summary', detail: 'Format an executive brief in Google Docs and alert the account team via Slack.' },
    ],
  },
  {
    id: 'pdf-extraction',
    tabIndex: 2,
    badge: 'Workflow 03',
    title: 'PDF & Invoice Data to Clean Google Sheets',
    shortDescription:
      'Structured rows, blank missing fields, and exceptions flagged for review.',
    deliverable: 'Auditable Google Sheets ledger with direct links to source documents and validation alerts.',
    tools: ['Google Drive', 'Google Sheets', 'Gmail', 'QuickBooks'],
    flowSteps: [
      { stepNumber: 1, title: 'Inbox & Drive Intake', detail: 'Monitor designated finance inboxes and folder drops for new incoming PDF files.' },
      { stepNumber: 2, title: 'Deterministic Parsing', detail: 'Extract invoice numbers, vendors, tax, totals, and line item breakdowns.' },
      { stepNumber: 3, title: 'Math Reconciliation', detail: 'Verify line item totals against stated subtotal and calculate discrepancies.' },
      { stepNumber: 4, title: 'Sheet Append & Review Flags', detail: 'Append clean rows, leaving unverified fields blank and flagging anomalies for human review.' },
    ],
  },
  {
    id: 'automated-quotes',
    tabIndex: 3,
    badge: 'Workflow 04',
    title: 'Automated Price Quotes & Weekly Ops Reports',
    shortDescription:
      'Automate custom price quotes from intake forms and generate weekly executive operations briefs.',
    deliverable: 'Human-in-the-loop quote generator and an automated Friday executive briefing dashboard.',
    tools: ['Google Forms', 'Google Docs', 'Google Sheets', 'Gmail'],
    flowSteps: [
      { stepNumber: 1, title: 'Intake Questionnaire', detail: 'Standardize customer requests through a structured form or onboarding questionnaire.' },
      { stepNumber: 2, title: 'Pricing Matrix Calculation', detail: 'Apply your custom business rules, rate cards, and tiered discounting constraints.' },
      { stepNumber: 3, title: 'Draft Quote Checkpoint', detail: 'Generate a branded Google Doc quote ready for manager 1-click approval.' },
      { stepNumber: 4, title: 'Friday Executive Summary', detail: 'Compile cross-team operational metrics into a concise Friday afternoon dispatch.' },
    ],
  },
];

export const SYNTHETIC_CRM_CONTACTS: SyntheticContact[] = [
  {
    id: 'c-01',
    name: 'Sarah Chen',
    company: 'Apex Supply Partners',
    role: 'VP Operations',
    fitScore: 94,
    duplicateResolution: 'Merged with record #402',
    priorityRationale: 'Expanded warehouse footprint last month; active hiring for inventory specialists.',
    suggestedOpener: 'Noticed Apex expanded your Midwest hub—are you still managing cross-facility SKU counts manually in Sheets?',
  },
  {
    id: 'c-02',
    name: 'Marcus Vance',
    company: 'BlueRiver Logistics',
    role: 'Managing Director',
    fitScore: 89,
    duplicateResolution: 'Unique primary lead',
    priorityRationale: 'Recently engaged with workflow automation content; 35 field technicians.',
    suggestedOpener: 'Saw your update on field service dispatching—teams of your scale often lose 8+ hours weekly reconciling job slips.',
  },
  {
    id: 'c-03',
    name: 'Elena Rostova',
    company: 'Summit Architectural',
    role: 'Director of Finance',
    fitScore: 87,
    duplicateResolution: 'Cleaned domain alias',
    priorityRationale: 'High invoice processing volume across 12 active commercial sub-contractors.',
    suggestedOpener: 'With 12 active build sites, how does Summit ensure sub-tier contractor billing matches original PO allowances?',
  },
  {
    id: 'c-04',
    name: 'David Kim',
    company: 'Vanguard Medical Equipment',
    role: 'Chief Commercial Officer',
    fitScore: 82,
    duplicateResolution: 'Unique primary lead',
    priorityRationale: 'Transitioned from legacy ERP to cloud; quote turnaround time exceeds 72 hours.',
    suggestedOpener: 'Reaching out following Vanguard’s ERP migration—we help teams cut quote turnaround from 3 days to under 4 hours.',
  },
  {
    id: 'c-05',
    name: 'Priya Patel',
    company: 'Kinetic Freight Group',
    role: 'Head of People & Ops',
    fitScore: 78,
    duplicateResolution: 'Merged with record #402',
    priorityRationale: 'Team expanded by 22 staff this quarter; onboarding bottleneck reported in reviews.',
    suggestedOpener: 'Congrats on Kinetic’s Q3 hiring milestone—are you looking to standardise team handoffs as head count expands?',
  },
];

export const SYNTHETIC_MEETING_TRANSCRIPT = `[00:14:22] Alex (Client): "We really need the weekly subcontractor lien waivers collected before we issue ACH payments every Tuesday."
[00:14:48] Jordan (Lead): "Understood. We will draft an automated reminder trigger on Friday at 3 PM and log status directly into the master tracker."
[00:15:10] Alex (Client): "Perfect. Send that workflow over to me by Thursday noon so I can review it before the weekend."`;

export const SYNTHETIC_MEETING_ITEMS: SyntheticMeetingItem[] = [
  {
    id: 'm-01',
    decision: 'Enforce lien waiver verification prior to Tuesday ACH disbursement',
    owner: 'Jordan M. (Ops Lead)',
    deadline: 'Thursday 12:00 PM',
    priority: 'Immediate',
    status: 'Committed',
  },
  {
    id: 'm-02',
    decision: 'Build Friday 3:00 PM automated subcontractor reminder sequence',
    owner: 'Taylor S. (Automation)',
    deadline: 'Friday 3:00 PM',
    priority: 'Immediate',
    status: 'Committed',
  },
  {
    id: 'm-03',
    decision: 'Sync subcontractor compliance status flags with master Google Sheet',
    owner: 'Jordan M. (Ops Lead)',
    deadline: 'Next Monday 9:00 AM',
    priority: 'Next Sprint',
    status: 'Needs Review',
  },
];

export const SYNTHETIC_INVOICE_ROWS: SyntheticInvoiceRow[] = [
  {
    invoiceNumber: 'INV-2026-881',
    vendor: 'Northwest Heavy Equipment LLC',
    dueDate: '2026-11-15',
    subtotal: '$12,450.00',
    tax: '$996.00',
    total: '$13,446.00',
    poNumber: 'PO-77401',
  },
  {
    invoiceNumber: 'INV-2026-882',
    vendor: 'Midland Industrial Supplies',
    dueDate: '2026-11-18',
    subtotal: '$4,210.00',
    tax: '$336.80',
    total: '$4,546.80',
    poNumber: null, // explicitly blank missing field per instructions
    flaggedReviewNotice: 'PO number missing from source PDF; placed in pending verification queue.',
  },
  {
    invoiceNumber: 'INV-2026-883',
    vendor: 'Atlas Concrete & Aggregates',
    dueDate: '2026-11-20',
    subtotal: '$18,900.00',
    tax: '$1,526.20',
    total: '$20,426.20',
    poNumber: 'PO-77389',
    flaggedReviewNotice: 'Discrepancy: Stated tax ($1,526.20) does not match standard 8% rate ($1,512.00). Flagged for human review.',
  },
  {
    invoiceNumber: 'INV-2026-884',
    vendor: 'Sterling Precision Tools',
    dueDate: '2026-11-22',
    subtotal: '$2,875.50',
    tax: '$230.04',
    total: '$3,105.54',
    poNumber: 'PO-77412',
  },
];

export const SYNTHETIC_QUOTE_DATA: SyntheticQuoteData = {
  quoteId: 'Q-2026-104',
  client: 'Cascade Distribution Group',
  scopeSummary: '3-facility inventory audit & automated reorder threshold alerting',
  lineItemsCount: 4,
  calculatedTier: 'Mid-Market Operational Tier (15-50 users)',
  estimatedTotal: '$8,400.00 / mo',
  approvalStatus: 'Pending Review',
};

export const SYNTHETIC_WEEKLY_DIGEST: SyntheticWeeklyDigest = {
  reportDate: 'Friday, Oct 24, 2026 · 4:30 PM',
  quotesGenerated: 14,
  acceptanceRate: '71%',
  invoicesProcessed: 142,
  hoursReclaimed: 38.5,
  exceptionsFlagged: 3,
  openFollowUps: 2,
};

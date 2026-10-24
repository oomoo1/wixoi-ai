export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_DOCS: Record<'privacy' | 'terms' | 'security', LegalDocument> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'October 24, 2026',
    sections: [
      {
        title: 'Information We Collect',
        paragraphs: [
          'Wixoi collects minimal operational contact information (name, business email, company name) necessary to review workflow requirements and schedule consultations.',
          'We do not sell, rent, or monetize client data under any circumstances. Client operational data used during workflow development remains strictly within your own designated systems.',
        ],
      },
      {
        title: 'Model Training & Data Confidentiality',
        paragraphs: [
          'We enforce zero training on client data. The foundation models and cloud APIs used in our architectures do not retain or train upon customer confidential business files or prompt inputs.',
          'Mutual Non-Disclosure Agreements (NDAs) are executed prior to reviewing proprietary internal files or accessing sensitive customer accounts.',
        ],
      },
      {
        title: 'Data Retention & Security',
        paragraphs: [
          'Contact requests and consultation notes are retained solely for the duration of our business relationship or until deletion is formally requested by emailing hq@wixoi.com.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'October 24, 2026',
    sections: [
      {
        title: 'Scope of Service',
        paragraphs: [
          'Wixoi provides workflow architecture, integration engineering, and team enablement services for small-to-midsize businesses.',
          'All engagements commence with an exploratory workflow review and a structured pilot phase with defined milestone deliverables.',
        ],
      },
      {
        title: 'Customer Ownership of Assets',
        paragraphs: [
          'All workflows, custom automations, documentation, and training guides deployed inside your Google Workspace, CRM, or cloud environment belong 100% to your organization upon project completion.',
        ],
      },
      {
        title: 'Limitation of Liability',
        paragraphs: [
          'Workflows incorporate human-in-the-loop review checkpoints for anomalies and exceptions. Wixoi is not liable for indirect business interruptions or external API third-party outages beyond our reasonable control.',
        ],
      },
    ],
  },
  security: {
    title: 'Security & Operations Overview',
    lastUpdated: 'October 24, 2026',
    sections: [
      {
        title: 'Zero Permanent Storage on External Servers',
        paragraphs: [
          'Wixoi architectures run directly inside your existing enterprise tools (Google Workspace, HubSpot, Salesforce). We do not build closed secondary data silos that siphon your operational records.',
        ],
      },
      {
        title: 'Human-in-the-Loop Safeguards',
        paragraphs: [
          'Every workflow that touches finance, quotes, or sensitive customer communication includes an explicit human checkpoint. Ambiguous records or missing values are left blank or flagged for staff sign-off.',
        ],
      },
      {
        title: 'Access Control & Credentials',
        paragraphs: [
          'We advocate least-privilege service accounts and time-bounded access. We never request master root passwords or personal administrative credentials.',
        ],
      },
    ],
  },
};

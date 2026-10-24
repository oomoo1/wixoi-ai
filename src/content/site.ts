export interface NavLink {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: 'Wixoi',
  legalName: 'Wixoi Operations LLC',
  url: 'https://wixoi.com',
  email: 'hq@wixoi.com',
  calBookingUrl: 'https://cal.com/wixoi/workflow-review',
  tagline: 'Turn repetitive admin into reliable workflows.',
  description:
    'Wixoi builds four focused workflows inside your CRM, Google Sheets, and Google Docs—then trains your team live to run them with confidence.',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Workflows', href: '#services' },
  { label: 'Transformation', href: '#demo' },
  { label: 'How It Works', href: '#process' },
  { label: 'Capacity Model', href: '#calculator' },
  { label: 'Security & FAQ', href: '#faq' },
];

export const HERO_PROOF_POINTS = [
  'Works inside existing tools',
  'Human review for uncertain outputs',
  'Live team training included',
  'Pilot before a longer commitment',
] as const;

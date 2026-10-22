import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {

  ArrowRight,

  Menu,

  X,

  Mail,

  FileText,

  FileSpreadsheet,

  Users,

  Search,

  ShieldCheck,

  CheckCircle2,

  Sparkles,

  Calendar as CalendarIcon,
  ExternalLink,

  MessageSquare,
  RotateCcw,
  Bot,

  Send,

  Clock,

  Globe,

  Video,

  ChevronLeft,

  ChevronRight,

  Zap,

  Award,

  Layers,

} from 'lucide-react';

import ShinyText from './components/ShinyText';

import BrandLogo from './components/BrandLogo';



const VIDEO_URL =

  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';



const navLinks = [

  { label: 'Done-For-You', href: '#offer' },

  { label: 'Systems', href: '#services' },

  { label: 'Live Flow', href: '#flow' },

  { label: 'ROI Model', href: '#estimate' },

  { label: 'Book Call', href: '#booking' },

];



// Alex Hormozi Value Equation Pillars: High Dream Outcome, High Certainty, Low Time Delay, Zero Effort

const hormoziPillars = [

  {

    badge: 'ZERO EFFORT FROM YOU',

    title: '100% Done-For-You Build',

    description:

      'You never touch a line of code or learn a complicated tool. We design, connect, test, and hand you a working system inside the apps your team already uses.',

  },

  {

    badge: 'FAST TIME TO VALUE',

    title: 'Live in 7 Days, Not Months',

    description:

      'Instead of 6-month consulting projects, we deploy your first working workflow on a real sample of your business files within one week.',

  },

  {

    badge: 'ZERO-RISK GUARANTEE',

    title: 'Judge the Real Output First',

    description:

      'You see the system sorting your emails, summarizing your meetings, or extracting your PDFs in a live pilot before making any long-term commitment.',

  },

  {

    badge: 'FULL TEAM ADOPTION',

    title: 'We Train Your Staff Live',

    description:

      'A great system is useless if your team ignores it. We train your staff live on screen-share and maintain the workflow every month for you.',

  },

];



// Clean, Visual, Animated Service Cards (No technical jargon or ugly code blocks)

const visualServices = [

  {

    id: 'email',

    icon: Mail,

    title: 'Inbox Triage & Ready Replies',

    outcome: 'Every email sorted & drafted automatically',

    simpleCopy:

      'We organize your incoming emails by priority and place ready-to-send reply drafts inside your inbox—your team simply clicks approve.',

    visual: 'email',

  },

  {

    id: 'crm',

    icon: Users,

    title: 'CRM Cleanup & Priority Leads',

    outcome: 'Know exactly who to call every morning',

    simpleCopy:

      'We clean messy contact lists, review past notes, and give your sales team a ranked daily call list with a tailored opening line.',

    visual: 'crm',

  },

  {

    id: 'meetings',

    icon: FileText,

    title: 'Meeting Summaries & Action Plans',

    outcome: 'Every call turned into clear tasks & owners',

    simpleCopy:

      'Send us your meeting recordings and receive a clean summary, assigned tasks for each team member, and a Friday leadership digest.',

    visual: 'meetings',

  },

  {

    id: 'pdf',

    icon: FileSpreadsheet,

    title: 'PDFs & Invoices to Clean Tables',

    outcome: 'Zero manual copy-pasting from documents',

    simpleCopy:

      'Invoices, contracts, and forms are turned automatically into clean Google Sheets rows with 100% accuracy and zero guesswork.',

    visual: 'pdf',

  },

  {

    id: 'knowledge',

    icon: Search,

    title: 'Instant Company Knowledge Search',

    outcome: 'Instant answers from your own files',

    simpleCopy:

      'Your team asks any question in plain English and gets an immediate, accurate answer pointing to the exact page in your company documents.',

    visual: 'knowledge',

  },

  {

    id: 'reports',

    icon: Award,

    title: 'Automated Quotes & Weekly Reports',

    outcome: 'Full visibility on hours saved every week',

    simpleCopy:

      'We automate price quotes, client follow-ups, and deliver a simple Friday executive report showing the exact hours saved across your team.',

    visual: 'reports',

  },

];



// Simple Visual Flow Steps (Replaces the ugly technical JSON box from Image 3)

const visualFlows = [

  {

    id: 'email',

    label: 'Email Automation',

    beforeTitle: 'Before Wixoi',

    beforeDesc: 'Hours lost every morning reading hundreds of mixed emails and typing repetitive replies.',

    wixoiAction: 'Wixoi labels every email & writes the reply draft in 3 seconds',

    afterTitle: 'Your Result',

    afterDesc: 'A clean, organized inbox where your team reviews and sends replies in minutes.',

    highlight: '100% Done-For-You inside Gmail & Outlook',

  },

  {

    id: 'pdf',

    label: 'Document Extraction',

    beforeTitle: 'Before Wixoi',

    beforeDesc: 'Staff manually opening PDF invoices and contracts to type numbers into spreadsheets.',

    wixoiAction: 'Wixoi reads every PDF and fills your spreadsheet automatically',

    afterTitle: 'Your Result',

    afterDesc: 'Every invoice and contract appears as a clean, verified row in Google Sheets.',

    highlight: 'Zero manual data entry • Zero guessed numbers',

  },

  {

    id: 'meetings',

    label: 'Meeting Intelligence',

    beforeTitle: 'Before Wixoi',

    beforeDesc: 'Long meetings end with forgotten tasks and nobody sure who owns the next step.',

    wixoiAction: 'Wixoi turns the recording into a summary + owner task list',

    afterTitle: 'Your Result',

    afterDesc: 'Every participant gets their clear action items, plus a weekly executive summary.',

    highlight: 'Delivered straight to Google Docs & Email',

  },

  {

    id: 'crm',

    label: 'Sales Prioritization',

    beforeTitle: 'Before Wixoi',

    beforeDesc: 'Valuable leads sit forgotten inside a messy CRM with outdated notes.',

    wixoiAction: 'Wixoi cleans your CRM & ranks the hottest leads to call today',

    afterTitle: 'Your Result',

    afterDesc: 'Your sales team starts every week with a ranked call list and ready opening hooks.',

    highlight: 'More booked deals from contacts you already own',

  },

];



interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  isStreaming?: boolean;
}

function FormattedChatMessage({ text }: { text: string }) {
  // Strip raw asterisks for clean executive rendering
  const cleaned = text.replace(/\*\*/g, '').replace(/\*/g, '');
  const lines = cleaned.split('\n');

  const renderLineContent = (lineText: string) => {
    const parts = lineText.split(/(#booking|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi);
    return parts.map((part, i) => {
      if (part.toLowerCase() === '#booking') {
        return (
          <a
            key={i}
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-md bg-[#2563EB]/25 border border-[#64CEFB]/40 text-[#64CEFB] hover:text-white hover:bg-[#2563EB]/50 transition-colors font-medium text-[11px] underline cursor-pointer"
          >
            🗓️ #booking
          </a>
        );
      }
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(part)) {
        return (
          <a
            key={i}
            href={`mailto:${part}`}
            className="text-[#64CEFB] underline hover:text-white font-medium"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed select-text">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ');
        const bulletText = isBullet ? trimmed.replace(/^[-•*]\s*/, '') : trimmed;

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 my-1">
              <span className="text-[#64CEFB] font-bold select-none text-xs leading-5">⚡</span>
              <span className="flex-1 leading-relaxed text-white/90">
                {renderLineContent(bulletText)}
              </span>
            </div>
          );
        }

        if (
          trimmed.endsWith(':') ||
          trimmed.startsWith('⚡') ||
          trimmed.startsWith('👉') ||
          trimmed.startsWith('🚀') ||
          trimmed.startsWith('👋') ||
          trimmed.startsWith('💼') ||
          trimmed.startsWith('🗓️')
        ) {
          return (
            <p key={idx} className="font-semibold text-white mt-1.5 mb-1 leading-snug">
              {renderLineContent(trimmed)}
            </p>
          );
        }

        return (
          <p key={idx} className="text-white/90 leading-relaxed">
            {renderLineContent(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function TypewriterMessage({
  content,
  isTyping,
  onTypingProgress,
}: {
  content: string;
  isTyping?: boolean;
  onTypingProgress?: () => void;
}) {
  const [displayedChars, setDisplayedChars] = React.useState(isTyping ? 0 : content.length);

  React.useEffect(() => {
    if (!isTyping) {
      setDisplayedChars(content.length);
      return;
    }

    setDisplayedChars(0);
    const totalLength = content.length;
    let current = 0;

    const interval = setInterval(() => {
      current += totalLength > 180 ? 3 : 2;
      if (current >= totalLength) {
        setDisplayedChars(totalLength);
        clearInterval(interval);
        if (onTypingProgress) onTypingProgress();
      } else {
        setDisplayedChars(current);
        if (onTypingProgress) onTypingProgress();
      }
    }, 12);

    return () => clearInterval(interval);
  }, [content, isTyping]);

  const visibleText = content.slice(0, displayedChars);
  const stillStreaming = isTyping && displayedChars < content.length;

  return (
    <div className="relative">
      <FormattedChatMessage text={visibleText} />
      {stillStreaming && (
        <span className="inline-block w-1.5 h-3.5 bg-[#64CEFB] animate-pulse ml-1 align-middle rounded-full shadow-[0_0_8px_#64CEFB]" />
      )}
    </div>
  );
}



export default function App() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'security' | null>(null);

  const [activeFlow, setActiveFlow] = useState<string>('email');



  // Interactive Calculator State

  const [hoursPerWeek, setHoursPerWeek] = useState<number>(6);

  const [teamSize, setTeamSize] = useState<number>(15);

  const [hourlyCost, setHourlyCost] = useState<number>(45);



  // Centerpiece Interactive Calendar State (Inspired by Image 2)

  const [duration, setDuration] = useState<'15m' | '30m' | '45m' | '1h'>('30m');

  const [selectedDate, setSelectedDate] = useState<number>(22);

  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');

  const [timezone, setTimezone] = useState<string>('America/Chicago (US Central)');

  const [bookingStep, setBookingStep] = useState<'calendar' | 'details' | 'confirmed'>('calendar');

  const [visitorName, setVisitorName] = useState<string>('');

  const [visitorEmail, setVisitorEmail] = useState<string>('');

  const [visitorGoal, setVisitorGoal] = useState<string>('');



  // Smart Assistant State (Clean, natural, no model names)

  const [chatOpen, setChatOpen] = useState<boolean>(false);

  const [chatInput, setChatInput] = useState<string>('');

  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        '👋 Hi! I am Smart Assistant, the official AI executive concierge for Wixoi.\n\n⚡ How can I assist your business today:\n• 📩 Automate repetitive inboxes & customer replies\n• 📊 Clean CRM pipelines & rank priority leads\n• 🗓️ Schedule a free 30-minute audit (#booking)',
      isStreaming: false,
    },
  ]);

  const quickPrompts = [
    '⚡ What can you automate?',
    '📩 Email & Inbox Triage',
    '🗓️ Book 30-Min Audit',
    '💰 Pricing & 7-Day Pilot',
  ];

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          '👋 Conversation reset. How can I help your company today?\n\n⚡ Pick a topic below or ask any question:\n• 📩 Email Triage & Inbox Automation\n• 📊 CRM Lead Scoring & Pipeline Cleanup\n• 🗓️ Book a free 30-minute audit (#booking)',
        isStreaming: false,
      },
    ]);
  };



  const videoRef = useRef<HTMLVideoElement>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);



  useEffect(() => {

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mq.matches && videoRef.current) {

      videoRef.current.pause();

    }

  }, []);



  useEffect(() => {

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages, chatOpen]);



  const monthlyHours = Math.round(hoursPerWeek * teamSize * 4);

  const annualHours = Math.round(hoursPerWeek * teamSize * 48);

  const monthlyValue = Math.round(monthlyHours * hourlyCost);

  const annualValue = Math.round(annualHours * hourlyCost);



  const currentFlow = visualFlows.find((f) => f.id === activeFlow) || visualFlows[0];



  // Natural conversational fallback if offline (Strictly in English, beautifully formatted)
  const getNaturalFallbackReply = (text: string): string => {
    const clean = text.trim().toLowerCase();

    if (
      clean === 'hi' ||
      clean === 'hello' ||
      clean === 'hey' ||
      clean === 'مرحبا' ||
      clean === 'سلام' ||
      clean === 'اهلا'
    ) {
      return '👋 Hi! How can I assist your business today?';
    }

    if (
      clean.includes('what is you') ||
      clean.includes('who are you') ||
      clean.includes('what are you') ||
      clean.includes('من انت')
    ) {
      return '👋 I am Smart Assistant, the official AI executive concierge for Wixoi!\n\n⚡ Here is what I can do:\n• 🤖 Guide you through custom Done-For-You AI workflows for your company\n• 📩 Explain email triage, CRM lead scoring, meeting digests, and document extraction\n• 🗓️ Help you lock in a free 30-minute audit with Mohammed Oumama\n\n💬 What part of your operations would you like to streamline?';
    }

    if (
      clean.includes('email') ||
      clean.includes('inbox') ||
      clean.includes('triage') ||
      clean.includes('بريد')
    ) {
      return '⚡ Email & Inbox Triage — Done-For-You Workflow:\n\n• 📥 Auto-Classification: Every incoming email is instantly categorized by priority and intent.\n• ✍️ Ready-to-Send Drafts: AI crafts context-aware response drafts tailored to your business voice.\n• 🏷️ Zero Clutter: Urgent threads get flagged, newsletters and spam get archived automatically.\n• ⏱️ Hours Saved: Reduces your team email burden by 80% daily.\n\n🗓️ Ready to test it on your actual inbox? Book a free 30-min audit in our #booking section, or email hq@wixoi.com!';
    }

    if (
      clean.includes('crm') ||
      clean.includes('lead') ||
      clean.includes('pipeline') ||
      clean.includes('عملاء')
    ) {
      return '📊 CRM Cleanup & Lead Scoring — Done-For-You Workflow:\n\n• 🧹 Database Sanitization: Deduplicates contacts and fills missing company data automatically.\n• 🎯 Priority Lead Ranking: Scores incoming leads based on deal size and urgency so reps call the best prospects first.\n• 🔄 Automatic Sync: Integrates seamlessly into HubSpot, Salesforce, or Pipedrive.\n\n🗓️ Want to see your top leads scored live? Schedule your free 30-min session at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('meeting') ||
      clean.includes('summar') ||
      clean.includes('record') ||
      clean.includes('اجتماع')
    ) {
      return '🗓️ Meeting Summaries & Action Items — Done-For-You Workflow:\n\n• 🎙️ Automatic Ingestion: Connects to Zoom, Google Meet, or Microsoft Teams recordings.\n• 📋 Executive Digests: Generates crisp 1-page summaries with key decisions, assigned owners, and deadlines.\n• 🚀 Project Tool Sync: Pushes tasks directly into Asana, ClickUp, Notion, or Slack.\n\n⚡ Never take manual meeting notes again. Lock in a free 30-minute audit at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('pdf') ||
      clean.includes('invoice') ||
      clean.includes('extract') ||
      clean.includes('فواتير')
    ) {
      return '📑 PDF & Document Extraction — Done-For-You Workflow:\n\n• 📄 100% Extraction Accuracy: Converts messy PDFs, scanned receipts, and invoices into structured spreadsheets.\n• 📊 Zero Manual Entry: Eliminates repetitive typing into Excel or Google Sheets.\n• 🛡️ Strict Quality Control: Flags discrepancies for human sign-off before committing records.\n\n🗓️ Test it on your actual sample files during a free 30-min audit at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('search') ||
      clean.includes('knowledge') ||
      clean.includes('file') ||
      clean.includes('بحث')
    ) {
      return '🔍 Internal Company Knowledge Search — Done-For-You Workflow:\n\n• 📁 Unified Intelligence: Connects your Google Drive, SharePoint, Notion, and internal SOPs.\n• ⚡ Instant Cited Answers: Employees ask questions and get accurate answers with direct links to the source files.\n• 🔒 Private & Secure: Your files remain completely private and are never used to train public models.\n\n👉 See it live on your company docs. Schedule a 30-min review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('price') ||
      clean.includes('cost') ||
      clean.includes('how much') ||
      clean.includes('سعر')
    ) {
      return '💼 Transparent Done-For-You Pricing:\n\n• 🎁 Free 30-Minute Audit: We map out your biggest bottleneck and calculate your exact ROI.\n• ⚡ 7-Day Live Pilot: You test the working system on your files before making any long-term commitment.\n• 🤝 Live Staff Training: We train your team on screen-share so adoption is 100% effortless.\n\n👉 Pick a time directly in our #booking section to get a tailored scope and pricing estimate!';
    }

    if (
      clean.includes('book') ||
      clean.includes('call') ||
      clean.includes('audit') ||
      clean.includes('حجز') ||
      clean.includes('موعد')
    ) {
      return '🗓️ Book Your Executive Workflow Audit:\n\n• ⏱️ Duration: 30 minutes with Mohammed Oumama.\n• 🎯 Output: A concrete 7-day Done-For-You pilot plan customized for your business.\n• 🔒 Privacy: 100% governed by a signed Mutual NDA.\n\n👉 Select your slot right now in the #booking section on this page, or email hq@wixoi.com!';
    }

    return '⚡ Wixoi designs, builds, and runs 100% Done-For-You AI workflows:\n\n• 📩 Email Triage & Customer Response\n• 📊 CRM Lead Scoring & Pipeline Organization\n• 🗓️ Meeting Summaries & Action Items\n• 📑 PDF & Invoice Data Extraction\n\n💬 Which of these areas would you like to automate first?';
  };

  const handleSendMessage = async (e?: React.FormEvent, directPrompt?: string) => {
    if (e) e.preventDefault();
    const query = directPrompt || chatInput;
    const trimmed = query.trim();
    if (!trimmed || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const updatedMessages: ChatMessage[] = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    const tryDirectOpenRouter = async (): Promise<string | null> => {
      const CANDIDATE_MODELS = [
        'nvidia/nemotron-3-ultra-550b-a55b:free',
        'dots-studio/dots-3-note-preview:free',
        'poolside/laguna-s-2.1:free',
      ];

      for (const m of CANDIDATE_MODELS) {
        try {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization:
                'Bearer ' +
                atob(
                  'c2stb3ItdjEtMzE0OTU3ODZlN2E4OWYwYjg4YmFiNDk4OTUyNTQzYjUyODg5MTlhMmZlYjIyMzFhMmEzYTdiYzlkOTZjMTgwMg=='
                ),
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://wixoi.com',
              'X-Title': 'Wixoi',
            },
            body: JSON.stringify({
              model: m,
              messages: [
                {
                  role: 'system',
                  content:
                    'You are Smart Assistant for Wixoi (wixoi.com). MANDATORY RULES:\n1. LANGUAGE: ALWAYS respond strictly in ENGLISH ONLY.\n2. NO ASTERISKS: NEVER output raw markdown asterisks (no **bold** or *stars*).\n3. USE EMOJIS: Use expressive emojis (⚡, 📩, 📊, 🗓️, 🚀, ✨, 💼).\n4. BULLETS & DASHES: When listing items or services, use clean bullet dashes (- or •) with a line break for every item.\n5. COLONS & LINE BREAKS: Use clear headers ending in a colon, followed by line breaks.\n6. CONCISE: 2 to 5 structured lines maximum.',
                },
                ...updatedMessages.map((msg) => ({ role: msg.role, content: msg.content })).slice(-8),
              ],
              max_tokens: 450,
              temperature: 0.3,
            }),
          });
          if (res.ok) {
            const d: any = await res.json();
            const text = d?.choices?.[0]?.message?.content?.trim();
            if (text) return text;
          }
        } catch {
          // try next model
        }
      }
      return null;
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          setMessages((prev) => [
            ...prev,
            { id: `a-${Date.now()}`, role: 'assistant', content: data.reply, isStreaming: true },
          ]);
          setChatLoading(false);
          return;
        }
      }

      // If /api/chat did not return reply, try direct OpenRouter fallback
      const directReply = await tryDirectOpenRouter();
      if (directReply) {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', content: directReply, isStreaming: true },
        ]);
        setChatLoading(false);
        return;
      }

      // Final fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: getNaturalFallbackReply(trimmed),
          isStreaming: true,
        },
      ]);
      setChatLoading(false);
    } catch {
      const directReply = await tryDirectOpenRouter();
      if (directReply) {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', content: directReply, isStreaming: true },
        ]);
        setChatLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: getNaturalFallbackReply(trimmed),
          isStreaming: true,
        },
      ]);
      setChatLoading(false);
    }
  };

  // Animated Visual Illustrations inside Service Cards (Replacing static text clutter)

  const renderAnimatedCardGraphic = (type: string) => {

    switch (type) {

      case 'email':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex flex-col justify-center gap-2.5">

            {[

              { title: 'New Client Quote Request', badge: 'Ready Draft', color: 'bg-[#2563EB]' },

              { title: 'Supplier Invoice #904', badge: 'Sorted', color: 'bg-emerald-500/80' },

            ].map((row, i) => (

              <motion.div

                key={row.title}

                animate={{ x: [0, 4, 0] }}

                transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}

                className="flex items-center justify-between rounded-xl bg-white/[0.05] border border-white/10 px-3.5 py-2"

              >

                <div className="flex items-center gap-2.5">

                  <span className="w-2 h-2 rounded-full bg-[#64CEFB]" />

                  <span className="text-xs font-medium text-white/90">{row.title}</span>

                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white ${row.color}`}>

                  {row.badge}

                </span>

              </motion.div>

            ))}

          </div>

        );

      case 'crm':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex flex-col justify-center gap-3">

            <div className="flex items-center justify-between text-xs text-white/85">

              <span className="font-semibold">Top Priority Call Today</span>

              <span className="text-emerald-400 font-bold">98% Match</span>

            </div>

            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">

              <motion.div

                animate={{ width: ['35%', '94%', '94%'] }}

                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}

                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#64CEFB]"

              />

            </div>

            <p className="text-[11px] text-white/60">

              ✓ Contacts cleaned • Opening script ready

            </p>

          </div>

        );

      case 'meetings':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex items-center justify-between gap-4">

            <div className="flex items-end gap-1 h-12 flex-1">

              {[40, 85, 55, 95, 65, 90, 50, 100, 70, 60].map((val, i) => (

                <motion.div

                  key={i}

                  animate={{ height: [`${val * 0.45}%`, `${val}%`, `${val * 0.45}%`] }}

                  transition={{ duration: 1.8, delay: i * 0.1, repeat: Infinity }}

                  className="flex-1 rounded-full bg-gradient-to-t from-[#2563EB] to-[#64CEFB]"

                />

              ))}

            </div>

            <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 px-3 py-2 text-xs text-emerald-300 font-semibold shrink-0">

              ✓ Tasks Assigned

            </div>

          </div>

        );

      case 'pdf':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex items-center justify-between gap-3">

            <div className="rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-3 text-center">

              <FileText className="w-5 h-5 text-[#64CEFB] mx-auto mb-1"/>

              <span className="text-[10px] text-white/75 block">PDF Invoice</span>

            </div>

            <motion.div

              animate={{ x: [-4, 4, -4] }}

              transition={{ duration: 2, repeat: Infinity }}

              className="text-[#64CEFB]"

            >

              <ArrowRight className="w-5 h-5"/>

            </motion.div>

            <div className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2.5 space-y-1.5">

              <div className="h-2 w-4/5 rounded-full bg-emerald-400/70" />

              <div className="h-2 w-3/5 rounded-full bg-[#64CEFB]/70" />

              <span className="text-[10px] text-emerald-300 block font-medium">

                Clean Sheet Row

              </span>

            </div>

          </div>

        );

      case 'knowledge':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex flex-col justify-center gap-2">

            <div className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs text-white/80 flex items-center gap-2">

              <Search className="w-3.5 h-3.5 text-[#64CEFB]"/>

              <span>&ldquo;What is our standard warranty?&rdquo;</span>

            </div>

            <motion.div

              animate={{ opacity: [0.65, 1, 0.65] }}

              transition={{ duration: 2.8, repeat: Infinity }}

              className="rounded-xl bg-[#2563EB]/20 border border-[#64CEFB]/40 px-3 py-1.5 text-[11px] text-[#64CEFB] font-medium"

            >

              ✓ Cited Answer: Operations_Guide.pdf (Page 14)

            </motion.div>

          </div>

        );

      default:

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex items-center justify-between">

            <div>

              <span className="text-[11px] text-[#64CEFB] uppercase tracking-wider block mb-1">

                Weekly Impact

              </span>

              <span className="text-2xl font-bold text-white">+142 Hrs Saved</span>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">

              <CheckCircle2 className="w-6 h-6"/>

            </div>

          </div>

        );

    }

  };



  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];



  const handleConfirmBooking = (e: React.FormEvent) => {

    e.preventDefault();

    setBookingStep('confirmed');

    const subject = encodeURIComponent(

      `Wixoi Audit Booking (${duration}) — Oct ${selectedDate} at ${selectedSlot}`

    );

    const body = encodeURIComponent(

      `Name: ${visitorName}\nEmail: ${visitorEmail}\nDate: October ${selectedDate}, 2026 at ${selectedSlot} (${timezone})\nDuration: ${duration}\nGoal: ${visitorGoal || 'Done-For-You AI Workflow Audit'}`

    );

    window.open(`mailto:hq@wixoi.com?subject=${subject}&body=${body}`, '_self');

  };



  return (

    <div className="min-h-screen bg-[#020510] text-white/90 font-sans relative selection:bg-[#2563EB]/40 selection:text-white">

      {/* =====================================================================

          HERO SECTION — Exact Calligraphic Logo, 3D Video & Clear Value Offer

      ===================================================================== */}

      <section

        id="home"

        className="relative min-h-screen w-full bg-[#000000] overflow-hidden flex flex-col justify-between"

      >

        <video

          ref={videoRef}

          src={VIDEO_URL}

          autoPlay

          loop

          muted

          playsInline

          preload="auto"

          aria-hidden="true"

          className="absolute inset-0 w-full h-full object-cover"

        />



        <div

          aria-hidden="true"

          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020510]/85 via-[#020510]/40 to-transparent"

        />

        <div

          aria-hidden="true"

          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#020510]"

        />

        <div

          aria-hidden="true"

          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020510] via-[#020510]/95 to-transparent"

        />



        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 flex-1 flex flex-col justify-between">

          <header>

            <nav className="flex items-center justify-between">

              <a href="#home" aria-label="Wixoi Home">

                <BrandLogo size="md"/>

              </a>



              <div className="hidden lg:flex items-center gap-7 rounded-full border border-white/15 bg-[#03081A]/70 backdrop-blur-2xl px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">

                {navLinks.map((item) => (

                  <a

                    key={item.label}

                    href={item.href}

                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"

                  >

                    {item.label}

                  </a>

                ))}

                <a

                  href="#booking"

                  className="group inline-flex items-center gap-2 rounded-full bg-white text-[#020510] px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-[#e6f4ff] transition-all"

                >

                  <span>Book Audit</span>

                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] transition-transform duration-200 group-hover:translate-x-0.5"/>

                </a>

              </div>



              <button

                type="button"

                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

                aria-label="Toggle navigation menu"

                className="lg:hidden rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md text-white p-2.5"

              >

                {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}

              </button>

            </nav>



            {mobileMenuOpen && (

              <div className="lg:hidden mt-4 rounded-3xl wixoi-3d-card p-6 flex flex-col gap-3.5">

                {navLinks.map((item) => (

                  <a

                    key={item.label}

                    href={item.href}

                    onClick={() => setMobileMenuOpen(false)}

                    className="text-base font-medium text-white/90 hover:text-[#64CEFB] py-1 transition-colors"

                  >

                    {item.label}

                  </a>

                ))}

                <a

                  href="#booking"

                  onClick={() => setMobileMenuOpen(false)}

                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#020510] font-bold text-sm py-3.5 px-6"

                >

                  <span>Book Free 30-Min Audit</span>

                  <ArrowRight className="w-4 h-4 text-[#2563EB]"/>

                </a>

              </div>

            )}

          </header>



          {/* Hero Center Block */}

          <div className="my-auto pt-14 pb-10 max-w-3xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-xl px-4 py-1.5 mb-7 shadow-[0_0_25px_rgba(59,130,246,0.25)]">

              <span className="flex h-2 w-2 relative">

                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />

                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />

              </span>

              <span className="text-xs font-medium tracking-wide text-white/90">

                100% Done-For-You AI Systems • Zero Technical Effort From Your Team

              </span>

            </div>



            <h1 className="font-serif italic font-normal text-6xl sm:text-7xl md:text-8xl xl:text-[6.4rem] leading-[0.94] tracking-tight text-white mb-6">

              <span className="block">Reclaim Your Team&apos;s</span>

              <span className="block mt-1">

                <ShinyText text="Operating Week."/>

              </span>

            </h1>



            <p className="text-base sm:text-lg md:text-[19px] text-white/80 max-w-xl leading-relaxed mb-9 font-normal">

              We build, connect, and run custom AI workflows for your company—sorting emails,

              ranking CRM leads, summarizing meetings, and turning PDFs into clean spreadsheets—while

              training your staff live to use them effortlessly.

            </p>



            <div className="flex flex-wrap items-center gap-4">

              <a

                href="#booking"

                className="group inline-flex items-center gap-4 bg-white hover:bg-[#f0f7ff] text-[#020510] rounded-full pl-7 pr-2.5 py-2.5 text-sm sm:text-base font-bold transition-all duration-200 shadow-[0_0_45px_rgba(100,206,251,0.4)]"

              >

                <span>Schedule Free 30-Min Audit</span>

                <span className="w-10 h-10 rounded-full bg-[#2563EB] group-hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">

                  <ArrowRight className="w-4 h-4"/>

                </span>

              </a>



              <button

                type="button"

                onClick={() => setChatOpen(true)}

                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-[#050C24]/70 hover:bg-white/10 backdrop-blur-xl px-6 py-4 text-sm sm:text-base font-semibold text-white transition-all"

              >

                <MessageSquare className="w-4 h-4 text-[#64CEFB]"/>

                <span>Talk to Smart Assistant</span>

              </button>

            </div>

          </div>



          {/* 4 Simple Value Promises */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">

            {[

              {

                label: 'DONE-FOR-YOU SETUP',

                value: 'Zero Tech Work',

                sub: 'We build & connect everything for you',

              },

              {

                label: 'SPEED TO RESULT',

                value: '7-Day Live Pilot',

                sub: 'Tested on your real sample files',

              },

              {

                label: 'RISK REVERSAL',

                value: 'Verify First',

                sub: 'See the output before you commit',

              },

              {

                label: 'TEAM ENABLEMENT',

                value: 'Live Training',

                sub: '24/7 operation & monthly care',

              },

            ].map((stat) => (

              <div

                key={stat.label}

                className="rounded-2xl border border-white/15 bg-[#040A1E]/75 backdrop-blur-xl px-4 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"

              >

                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#64CEFB] mb-1">

                  {stat.label}

                </p>

                <p className="text-base sm:text-lg font-bold text-white">{stat.value}</p>

                <p className="text-xs text-white/60 mt-0.5">{stat.sub}</p>

              </div>

            ))}

          </div>

        </div>

      </section>



      <main className="relative z-10 overflow-hidden">

        {/* Ambient 3D Sapphire Light Curtains */}

        <div

          aria-hidden="true"

          className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50"

        >

          <div className="absolute -top-32 right-[6%] w-[380px] h-[120vh] bg-gradient-to-b from-blue-600/20 via-[#64CEFB]/10 to-transparent blur-3xl animate-pulse-glow" />

          <div className="absolute top-[25%] left-[4%] w-[320px] h-[100vh] bg-gradient-to-b from-indigo-600/15 via-blue-500/10 to-transparent blur-3xl" />

        </div>



        {/* ===================================================================

            1. THE GRAND SLAM OFFER (ALEX HORMOZI DONE-FOR-YOU POLICY)

        =================================================================== */}

        <section

          id="offer"

          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20"

        >

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64CEFB] mb-3">

              OUR DONE-FOR-YOU GUARANTEE

            </p>

            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-[1.02] mb-4">

              We Handle Every Step. You Keep the Time Saved.

            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed">

              Most agencies hand you complicated software and wish you luck. We do the opposite:

              we build the entire system for you, prove it on your files, and train your team until

              it runs like clockwork.

            </p>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {hormoziPillars.map((pillar, i) => (

              <motion.div

                key={pillar.title}

                initial={{ opacity: 0, y: 18 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ duration: 0.4, delay: i * 0.07 }}

                className="wixoi-3d-card rounded-[28px] p-7 flex flex-col justify-between"

              >

                <div>

                  <span className="inline-block rounded-full border border-[#64CEFB]/40 bg-[#2563EB]/20 px-3 py-1 text-[10px] font-mono font-bold text-[#64CEFB] mb-4">

                    {pillar.badge}

                  </span>

                  <h3 className="text-xl font-bold text-white mb-2.5">{pillar.title}</h3>

                  <p className="text-sm text-white/75 leading-relaxed">{pillar.description}</p>

                </div>

              </motion.div>

            ))}

          </div>

        </section>



        {/* ===================================================================

            2. SIMPLE, MOVING VISUAL SERVICES (CLEAN & ELEGANT — NO CODE JARGON)

        =================================================================== */}

        <section

          id="services"

          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"

        >

          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">

            <div>

              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64CEFB] mb-3">

                WHAT WE AUTOMATE FOR YOU

              </p>

              <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-[1.02]">

                Six Systems Built Around Your Daily Work

              </h2>

            </div>

            <p className="text-sm md:text-base text-white/75 max-w-md leading-relaxed">

              Everything appears directly inside Gmail, Google Docs, Google Sheets, and your CRM—no

              new software for your staff to learn.

            </p>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {visualServices.map((s, idx) => {

              const Icon = s.icon;

              return (

                <motion.div

                  key={s.id}

                  initial={{ opacity: 0, y: 20 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  viewport={{ once: true }}

                  transition={{ duration: 0.45, delay: idx * 0.05 }}

                  className="wixoi-3d-card rounded-[30px] p-7 flex flex-col justify-between group"

                >

                  <div>

                    <div className="flex items-center justify-between gap-3 mb-5">

                      <div className="w-11 h-11 rounded-2xl border border-[#64CEFB]/40 bg-[#040B22] flex items-center justify-center text-[#64CEFB]">

                        <Icon className="w-5 h-5"/>

                      </div>

                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">

                        {s.outcome}

                      </span>

                    </div>



                    {/* Smooth Animated Visual Graphic */}

                    {renderAnimatedCardGraphic(s.visual)}



                    <h3 className="text-xl font-bold text-white mt-5 mb-2.5 group-hover:text-[#64CEFB] transition-colors">

                      {s.title}

                    </h3>

                    <p className="text-sm text-white/75 leading-relaxed">{s.simpleCopy}</p>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </section>



        {/* ===================================================================

            3. ANIMATED BEFORE / AFTER TRANSFORMATION (REPLACING UGLY JSON BOX)

        =================================================================== */}

        <section

          id="flow"

          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"

        >

          <div className="wixoi-3d-card rounded-[34px] p-6 sm:p-10 md:p-14">

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">

              <div>

                <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64CEFB] mb-3">

                  SIMPLE VISUAL TRANSFORMATION

                </p>

                <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-white leading-tight">

                  See How Work Flows When We Take Over

                </h2>

              </div>



              {/* Clean Pill Switcher */}

              <div className="flex flex-wrap gap-2">

                {visualFlows.map((f) => {

                  const active = f.id === activeFlow;

                  return (

                    <button

                      key={f.id}

                      type="button"

                      onClick={() => setActiveFlow(f.id)}

                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${

                        active

                          ? 'bg-white text-[#020510] shadow-[0_0_25px_rgba(100,206,251,0.5)]'

                          : 'bg-white/[0.05] text-white/75 hover:text-white border border-white/10'

                      }`}

                    >

                      {f.label}

                    </button>

                  );

                })}

              </div>

            </div>



            <AnimatePresence mode="wait">

              <motion.div

                key={currentFlow.id}

                initial={{ opacity: 0, y: 10 }}

                animate={{ opacity: 1, y: 0 }}

                exit={{ opacity: 0, y: -10 }}

                transition={{ duration: 0.3 }}

                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"

              >

                {/* Step 1: Manual Work */}

                <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#020510]/90 p-7">

                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">

                    1. {currentFlow.beforeTitle}

                  </span>

                  <p className="text-base text-white/85 leading-relaxed">{currentFlow.beforeDesc}</p>

                </div>



                {/* Step 2: Animated Wixoi Center Engine */}

                <div className="lg:col-span-4 rounded-3xl wixoi-obsidian-box p-7 text-center relative overflow-hidden">

                  <motion.div

                    animate={{ scale: [1, 1.06, 1] }}

                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}

                    className="w-14 h-14 rounded-2xl bg-[#2563EB]/30 border border-[#64CEFB] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(100,206,251,0.5)]"

                  >

                    <Sparkles className="w-6 h-6 text-[#64CEFB]"/>

                  </motion.div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#64CEFB] block mb-1">

                    2. DONE FOR YOU BY WIXOI

                  </span>

                  <p className="text-base font-bold text-white">{currentFlow.wixoiAction}</p>

                </div>



                {/* Step 3: Clean Outcome */}

                <div className="lg:col-span-4 rounded-3xl border border-emerald-400/35 bg-emerald-500/10 p-7">

                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block mb-2">

                    3. {currentFlow.afterTitle}

                  </span>

                  <p className="text-base text-white font-medium leading-relaxed mb-3">

                    {currentFlow.afterDesc}

                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">

                    <CheckCircle2 className="w-4 h-4"/>

                    {currentFlow.highlight}

                  </span>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </section>



        {/* ===================================================================

            4. 3D CAPACITY & ROI CALCULATOR

        =================================================================== */}

        <section

          id="estimate"

          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"

        >

          <div className="wixoi-3d-card rounded-[34px] p-6 sm:p-10 md:p-14 overflow-hidden">

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              <div className="lg:col-span-7 space-y-8">

                <div>

                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64CEFB] mb-3">

                    OPERATIONAL TIME &amp; PAYROLL MODEL

                  </p>

                  <h2 className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02] tracking-tight mb-4">

                    Calculate Your Annual AI Capacity Lift

                  </h2>

                  <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">

                    Adjust the sliders for{' '}

                    <strong className="text-white">Your Operations &amp; Admin Team</strong> to see

                    how much staff time and payroll value is currently tied up in manual work.

                  </p>

                </div>



                <div className="space-y-6 pt-2">

                  <div>

                    <div className="flex items-center justify-between text-sm mb-2.5">

                      <label htmlFor="slider-hours" className="text-white/85 font-medium">

                        Weekly Repetitive Admin Hours (Per Person)

                      </label>

                      <span className="text-white font-bold text-base">

                        {hoursPerWeek} Hours / wk

                      </span>

                    </div>

                    <input

                      id="slider-hours"

                      type="range"

                      min={1}

                      max={25}

                      step={0.5}

                      value={hoursPerWeek}

                      onChange={(e) => setHoursPerWeek(parseFloat(e.target.value))}

                      style={{

                        background: `linear-gradient(to right, #2563EB ${

                          ((hoursPerWeek - 1) / 24) * 100

                        }%, rgba(255,255,255,0.15) ${((hoursPerWeek - 1) / 24) * 100}%)`,

                      }}

                      className="w-full wixoi-slider"

                    />

                  </div>



                  <div>

                    <div className="flex items-center justify-between text-sm mb-2.5">

                      <label htmlFor="slider-team" className="text-white/85 font-medium">

                        Team Members Handling Admin &amp; Operations

                      </label>

                      <span className="text-white font-bold text-base">

                        {teamSize} Staff Members

                      </span>

                    </div>

                    <input

                      id="slider-team"

                      type="range"

                      min={2}

                      max={150}

                      step={1}

                      value={teamSize}

                      onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}

                      style={{

                        background: `linear-gradient(to right, #2563EB ${

                          ((teamSize - 2) / 148) * 100

                        }%, rgba(255,255,255,0.15) ${((teamSize - 2) / 148) * 100}%)`,

                      }}

                      className="w-full wixoi-slider"

                    />

                  </div>



                  <div>

                    <div className="flex items-center justify-between text-sm mb-2.5">

                      <label htmlFor="slider-rate" className="text-white/85 font-medium">

                        Average Hourly Staff Cost (USD)

                      </label>

                      <span className="text-white font-bold text-base">

                        ${hourlyCost.toLocaleString('en-US')} / hr

                      </span>

                    </div>

                    <input

                      id="slider-rate"

                      type="range"

                      min={20}

                      max={150}

                      step={5}

                      value={hourlyCost}

                      onChange={(e) => setHourlyCost(parseInt(e.target.value, 10))}

                      style={{

                        background: `linear-gradient(to right, #2563EB ${

                          ((hourlyCost - 20) / 130) * 100

                        }%, rgba(255,255,255,0.15) ${((hourlyCost - 20) / 130) * 100}%)`,

                      }}

                      className="w-full wixoi-slider"

                    />

                  </div>

                </div>

              </div>



              <div className="lg:col-span-5">

                <div

                  aria-live="polite"

                  className="wixoi-obsidian-box rounded-[28px] p-7 sm:p-9 text-center"

                >

                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 mb-4">

                    ESTIMATED ADMIN PAYROLL CAPACITY

                  </p>



                  <div className="flex items-baseline justify-center gap-1 mb-3">

                    <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">

                      ${monthlyValue.toLocaleString('en-US')}

                    </span>

                    <span className="text-lg text-white/60 font-medium">/mo</span>

                  </div>



                  <p className="text-xs sm:text-sm font-medium text-emerald-400 mb-6 leading-relaxed">

                    {monthlyHours.toLocaleString('en-US')} Staff Hours / Month (

                    {annualHours.toLocaleString('en-US')} hrs &amp; $

                    {annualValue.toLocaleString('en-US')} / year)

                  </p>



                  <a

                    href="#booking"

                    className="group w-full inline-flex items-center justify-between bg-white hover:bg-[#f0f7ff] text-[#020510] rounded-full pl-6 pr-2 py-2 text-sm sm:text-base font-bold transition-all duration-200 shadow-lg"

                  >

                    <span>Book Your Workflow Audit Now</span>

                    <span className="w-10 h-10 rounded-full bg-[#2563EB] group-hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">

                      <ArrowRight className="w-4 h-4"/>

                    </span>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>
        {/* ===================================================================
            5. CENTERPIECE INTERACTIVE SCHEDULER WIDGET — POWERED BY CAL.COM
        =================================================================== */}
        <section
          id="booking"
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#64CEFB]/35 bg-[#2563EB]/15 px-3.5 py-1 text-xs font-mono text-[#64CEFB] mb-3">
              <CalendarIcon className="w-3.5 h-3.5"/>
              <span>DIRECT CAL.COM INTERACTIVE SCHEDULER</span>
            </div>
            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white leading-[1.02] mb-3">
              Book Your Workflow Audit
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Select your date and time below to schedule directly with our executive team. Instant confirmation &amp; Google Meet invite sent automatically.
            </p>
          </div>

          {/* Centerpiece Split Calendar Card */}
          <div className="wixoi-3d-card rounded-[34px] overflow-hidden shadow-[0_30px_100px_rgba(37,99,235,0.35)]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Host Profile, Title, Location & Timezone */}
              <div className="lg:col-span-5 p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#030716]/90 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <BrandLogo size="sm"/>

                  <div>
                    <p className="text-xs font-semibold text-[#64CEFB] mb-1">
                      Mohammed Oumama · Executive AI Architecture Team
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      Done-For-You AI Workflow Audit
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                      We review one repetitive bottleneck in your business and map out your 7-day
                      Done-For-You pilot with concrete architecture, timeline, and ROI calculation.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-xs text-white/80">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#64CEFB]"/>
                      <span>30-Minute Architecture Session</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-[#64CEFB]"/>
                      <span>Google Meet / Zoom Video Call (Auto-Generated)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#64CEFB]"/>
                      <span>Mutual NDA Protected Engagement</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://cal.com/mohammed-oumama-f6hvzb/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-sm"
                    >
                      <span>Open Cal.com in Fullscreen</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#64CEFB]"/>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/55">
                  <span>Direct Desk: hq@wixoi.com</span>
                  <span className="text-emerald-400 font-medium">● Instant Cal.com Booking</span>
                </div>
              </div>

              {/* Right Column: Embedded Cal.com Scheduler */}
              <div className="lg:col-span-7 bg-[#020510]/95 min-h-[680px] p-2 sm:p-4 flex flex-col justify-center relative">
                <iframe
                  src="https://cal.com/mohammed-oumama-f6hvzb/30min?embed=true&theme=dark"
                  title="Wixoi AI Executive Consultation"
                  className="w-full h-[660px] rounded-2xl border border-white/10 bg-[#020510]"
                  allow="camera; microphone; autoplay; clipboard-write"
                />
              </div>
            </div>
          </div>
        </section>

      </main>



      {/* =====================================================================

          6. MINIMALIST COMPACT FOOTER (QUIET, SMALL, UNDERSTATED)

      ===================================================================== */}

      <footer className="relative z-10 border-t border-white/10 bg-[#010308] py-6 text-xs text-white/50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <BrandLogo size="sm"/>

            <span className="text-white/30">•</span>

            <span>© 2026 Wixoi</span>

            <span className="hidden md:inline text-white/30">•</span>

            <span className="hidden md:inline text-white/60">24/7 Operations</span>

          </div>



          <div className="flex flex-wrap items-center gap-5">

            <a

              href="mailto:hq@wixoi.com"

              className="text-white/70 hover:text-white transition-colors font-mono"

            >

              hq@wixoi.com

            </a>

            <button

              type="button"

              onClick={() => setLegalModal('privacy')}

              className="hover:text-white transition-colors"

            >

              Privacy

            </button>

            <button

              type="button"

              onClick={() => setLegalModal('terms')}

              className="hover:text-white transition-colors"

            >

              Terms

            </button>

            <button

              type="button"

              onClick={() => setLegalModal('security')}

              className="hover:text-white transition-colors"

            >

              NDA &amp; Security

            </button>

          </div>

        </div>

      </footer>



      {/* =====================================================================

          7. SMART ASSISTANT WIDGET (ELEVATED 3D GLASSMORPHIC UI + TYPEWRITER STREAMING)
      ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-50">
        {!chatOpen ? (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            aria-label="Open Smart Assistant"
            className="group relative flex items-center gap-3 rounded-full border border-[#64CEFB]/40 bg-[#040B22]/95 hover:bg-[#071338] text-white pl-3.5 pr-5 py-2.5 shadow-[0_12px_45px_rgba(37,99,235,0.6)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:border-[#64CEFB]"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#64CEFB] flex items-center justify-center text-white shadow-[0_0_15px_rgba(100,206,251,0.6)]">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#040B22] animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold leading-none tracking-wide text-white flex items-center gap-1.5">
                <span>Smart Assistant</span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#2563EB]/30 text-[#64CEFB]">
                  AI
                </span>
              </span>
              <span className="block text-[10px] text-emerald-400 mt-1 font-medium">● Online • 24/7</span>
            </div>
          </button>
        ) : (
          <div className="w-[calc(100vw-32px)] sm:w-[410px] h-[550px] sm:h-[590px] max-h-[85vh] rounded-3xl bg-[#030718]/95 backdrop-blur-2xl border border-white/15 shadow-[0_30px_100px_rgba(37,99,235,0.45)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Executive Assistant Header */}
            <div className="px-5 py-3.5 border-b border-white/10 bg-[#020510]/95 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#64CEFB] flex items-center justify-center text-white shadow-[0_0_12px_rgba(100,206,251,0.5)]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#020510] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                    <span>Smart Assistant</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-[#2563EB]/25 text-[#64CEFB] border border-[#64CEFB]/30">
                      Wixoi AI
                    </span>
                  </h4>
                  <p className="text-[10px] text-white/50">Real AI • English Only • Zero Wait</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Restart conversation"
                  aria-label="Restart conversation"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close Assistant"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#020510]/80 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-tr-sm shadow-[0_4px_15px_rgba(37,99,235,0.3)]'
                        : 'bg-[#060F2B]/90 border border-white/10 text-white/95 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    {m.role === 'assistant' ? (
                      <TypewriterMessage
                        content={m.content}
                        isTyping={m.isStreaming}
                        onTypingProgress={() => {
                          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      />
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-[#060F2B]/90 border border-white/10 px-4 py-3 text-white/70 text-xs flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#64CEFB] animate-ping" />
                    <span>Thinking &amp; formatting answer...</span>
                  </div>
                </div>
              )}

              {/* Quick Suggestion Chips */}
              {messages.length <= 3 && !chatLoading && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-2">
                    Suggested topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp) => (
                      <button
                        key={qp}
                        type="button"
                        onClick={() => handleSendMessage(undefined, qp)}
                        className="rounded-full bg-white/[0.06] hover:bg-[#2563EB]/30 border border-white/15 hover:border-[#64CEFB]/50 px-3 py-1 text-[11px] text-white/80 hover:text-white transition-all text-left"
                      >
                        {qp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className="p-3 border-t border-white/10 bg-[#010308]/95 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about workflows, audit, pricing..."
                  className="flex-1 rounded-xl border border-white/15 bg-[#040B1E] px-3.5 py-2.5 text-xs text-white placeholder:text-white/35 focus:border-[#64CEFB] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-40 disabled:hover:bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.4)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/40 px-1">
                <span>⚡ Real AI • Instant answers</span>
                <span>English only</span>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* LEGAL MODALS */}

      {legalModal && (

        <div

          role="dialog"

          aria-modal="true"

          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"

        >

          <div className="relative w-full max-w-xl rounded-3xl wixoi-3d-card p-6 sm:p-8 text-white/85">

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">

              <h2 className="text-lg font-bold text-white">

                {legalModal === 'privacy'

                  ? 'Privacy Policy'

                  : legalModal === 'terms'

                  ? 'Terms of Service'

                  : 'NDA & Security Standards'}

              </h2>

              <button

                type="button"

                onClick={() => setLegalModal(null)}

                className="p-1.5 rounded-full border border-white/15 text-white/80 hover:text-white"

              >

                <X className="w-4 h-4"/>

              </button>

            </div>



            {legalModal === 'privacy' && (

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">

                <p>

                  <strong>1. Zero-Cookie Architecture:</strong> Wixoi operates wixoi.com without

                  tracking cookies or third-party advertising pixels.

                </p>

                <p>

                  <strong>2. Booking &amp; Contact Data:</strong> Information submitted via our

                  scheduler or sent to hq@wixoi.com is used solely to coordinate your workflow

                  review.

                </p>

                <p>

                  <strong>3. Mutual NDA Protection:</strong> All client engagements are governed by

                  a signed Mutual Non-Disclosure Agreement prior to accessing any company files.

                </p>

              </div>

            )}



            {legalModal === 'terms' && (

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">

                <p>

                  <strong>1. Done-For-You Scope:</strong> All pilot and production workflow builds

                  are governed by a written Statement of Work and Mutual NDA.

                </p>

                <p>

                  <strong>2. Capacity Calculator:</strong> The calculator illustrates mathematical

                  time capacity from user inputs and is not a financial guarantee.

                </p>

                <p>

                  <strong>3. Direct B2B Billing:</strong> All engagements are billed via direct B2B

                  invoice.

                </p>

              </div>

            )}



            {legalModal === 'security' && (

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">

                <p>

                  <strong>1. Zero-Password Access:</strong> We never ask for master passwords or

                  admin logins. We work via shared folders or revocable API keys.

                </p>

                <p>

                  <strong>2. Human Approval:</strong> Your team retains final review over all drafts

                  and extracted records.

                </p>

              </div>

            )}



            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">

              <button

                type="button"

                onClick={() => setLegalModal(null)}

                className="rounded-full bg-white text-[#020510] font-bold px-5 py-1.5 text-xs"

              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

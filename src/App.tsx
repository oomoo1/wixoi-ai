import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {

  ArrowRight,

  Menu,

  X,

  FileText,

  FileSpreadsheet,

  Users,

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

  Video,

  Award,

} from 'lucide-react';

import ShinyText from './components/ShinyText';

import BrandLogo from './components/BrandLogo';



const VIDEO_URL =

  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';



const navLinks = [
  { label: 'Our Approach', href: '#offer' },
  { label: 'Services', href: '#services' },
  { label: 'Live Flow', href: '#flow' },
  { label: 'ROI Model', href: '#estimate' },
  { label: 'Book Call', href: '#booking' },
];

// Value Equation Pillars: High Dream Outcome, High Certainty, Low Time Delay, Zero Effort
const hormoziPillars = [
  {
    badge: 'ZERO EFFORT FROM YOU',
    title: 'Complete Setup & Integration',
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
      'You see the system summarizing your meetings, ranking your CRM leads, or extracting your PDFs in a live pilot before making any long-term commitment.',
  },
  {
    badge: 'FULL TEAM ADOPTION',
    title: 'We Train Your Staff Live',
    description:
      'A great system is useless if your team ignores it. We train your staff live on screen-share and maintain the workflow every month for you.',
  },
];



// Clean, Visual, Animated Service Cards (4 Active Services We Deliver)
const activeServices = [
  {
    id: 'crm',
    icon: Users,
    title: 'CRM Cleanup & Priority Leads',
    outcome: 'Available now',
    simpleCopy:
      'We clean messy contact lists, review past notes, and give your sales team a ranked call list with tailored opening lines.',
    visual: 'crm',
  },
  {
    id: 'meetings',
    icon: FileText,
    title: 'Meeting Summaries & Action Plans',
    outcome: 'Available now',
    simpleCopy:
      'Send meeting recordings and receive an executive summary, main discussion topics, and assigned tasks with owners in Google Docs.',
    visual: 'meetings',
  },
  {
    id: 'pdf',
    icon: FileSpreadsheet,
    title: 'PDFs & Invoices to Clean Sheets',
    outcome: 'Available now',
    simpleCopy:
      'Invoices, contracts, and receipts are converted into clean Google Sheets rows. Missing fields stay empty and doubtful items are flagged for human check.',
    visual: 'pdf',
  },
  {
    id: 'reports',
    icon: Award,
    title: 'Automated Quotes & Weekly Reports',
    outcome: 'Available now',
    simpleCopy:
      'Automate client price quotes and follow-ups, and receive a weekly executive summary report tracking operations.',
    visual: 'reports',
  },
];


// Simple Visual Flow Steps
const visualFlows = [
  {
    id: 'crm',
    label: 'CRM & Lead Ranking',
    beforeTitle: 'Before Wixoi AI',
    beforeDesc: 'Valuable contacts sit unranked inside a messy CRM or export without priority.',
    wixoiAction: 'Wixoi AI reviews contacts and ranks who to call this week with opening lines',
    afterTitle: 'Your Result',
    afterDesc: 'Your sales team starts every week with a prioritized call list and ready opening hooks.',
    highlight: 'Prioritized contacts & suggested opening lines',
  },
  {
    id: 'meetings',
    label: 'Meeting Summaries',
    beforeTitle: 'Before Wixoi AI',
    beforeDesc: 'Long meetings end with forgotten tasks and nobody sure who owns the next step.',
    wixoiAction: 'Wixoi AI turns the recording into a summary + owner task list',
    afterTitle: 'Your Result',
    afterDesc: 'Every participant gets their clear action items delivered straight to Google Docs.',
    highlight: 'Delivered straight to Google Docs',
  },
  {
    id: 'pdf',
    label: 'Document Extraction',
    beforeTitle: 'Before Wixoi AI',
    beforeDesc: 'Staff manually opening PDF invoices and contracts to type numbers into spreadsheets.',
    wixoiAction: 'Wixoi AI reads every PDF and fills your spreadsheet automatically',
    afterTitle: 'Your Result',
    afterDesc: 'Every invoice and contract appears as a clean, verified row in Google Sheets.',
    highlight: 'Zero manual data entry • Zero guessed numbers',
  },
  {
    id: 'reports',
    label: 'Quotes & Weekly Reports',
    beforeTitle: 'Before Wixoi AI',
    beforeDesc: 'Drafting quotes manually and losing visibility on weekly operations and capacity.',
    wixoiAction: 'Wixoi AI automates quote generation & compiles a concise weekly executive report',
    afterTitle: 'Your Result',
    afterDesc: 'Fast client quote replies and a clean weekly executive report delivered automatically.',
    highlight: 'Automated quotes & executive visibility',
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
  const onTypingProgressRef = React.useRef(onTypingProgress);
  React.useEffect(() => {
    onTypingProgressRef.current = onTypingProgress;
  });

  React.useEffect(() => {
    if (!isTyping) {
      return;
    }

    const totalLength = content.length;
    let current = 0;

    const interval = setInterval(() => {
      current += totalLength > 180 ? 3 : 2;
      if (current >= totalLength) {
        setDisplayedChars(totalLength);
        clearInterval(interval);
        if (onTypingProgressRef.current) onTypingProgressRef.current();
      } else {
        setDisplayedChars(current);
        if (onTypingProgressRef.current) onTypingProgressRef.current();
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

  const msgCounterRef = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'security' | null>(null);

  const [activeFlow, setActiveFlow] = useState<string>('crm');



  // Interactive Calculator State

  const [hoursPerWeek, setHoursPerWeek] = useState<number>(6);

  const [teamSize, setTeamSize] = useState<number>(15);

  const [hourlyCost, setHourlyCost] = useState<number>(45);



  // Embedded Cal.com interactive scheduler



  // Smart Assistant State (Clean, natural, no model names)

  const [chatOpen, setChatOpen] = useState<boolean>(false);

  const [chatInput, setChatInput] = useState<string>('');

  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        '👋 Hi! I am the AI assistant for Wixoi AI (not a person).\n\n⚡ Here are the 4 workflows we build and run:\n• 📊 CRM cleanup & priority lead ranking\n• 🗓️ Meeting summaries & action plans in Google Docs\n• 📑 PDFs & invoices to clean Google Sheets rows\n• 📈 Automated quotes & weekly executive reports\n\n🗓️ How can I assist your business today?',
      isStreaming: false,
    },
  ]);

  const quickPrompts = [
    '📊 CRM & Lead Ranking',
    '🗓️ Meeting Summaries',
    '📑 PDFs to Google Sheets',
    '📈 Quotes & Weekly Reports',
  ];

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          '👋 Conversation reset. I am an AI assistant for Wixoi AI.\n\n⚡ Pick a topic below or ask any question:\n• 📊 CRM cleanup & lead ranking\n• 🗓️ Meeting summaries & action plans\n• 📑 PDFs & invoices to Google Sheets\n• 📈 Automated quotes & weekly reports\n\n🗓️ You can also schedule a free review at #booking.',
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
      return '👋 Hi! I am an AI assistant for Wixoi AI. How can I assist your business today?';
    }

    if (
      clean.includes('what is you') ||
      clean.includes('who are you') ||
      clean.includes('what are you') ||
      clean.includes('من انت')
    ) {
      return '👋 I am an AI assistant for Wixoi AI (not a person).\n\n⚡ Here are the 4 workflows we build and run:\n• 📊 CRM cleanup & priority lead ranking\n• 🗓️ Meeting summaries & action plans in Google Docs\n• 📑 PDFs & invoices to clean Google Sheets rows\n• 📈 Automated quotes & weekly executive reports\n\n🗓️ Book a free workflow review at #booking or email hq@wixoi.com.';
    }

    if (
      clean.includes('crm') ||
      clean.includes('lead') ||
      clean.includes('pipeline') ||
      clean.includes('ranking') ||
      clean.includes('عملاء')
    ) {
      return '📊 CRM Cleanup & Lead Ranking (Available Now):\n\n• Clean messy contact lists and fill missing details.\n• Rank contacts worth a call this week with suggested opening lines.\n• Helps your sales team prioritize who to call first.\n\n🗓️ Book a free workflow review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('meeting') ||
      clean.includes('summar') ||
      clean.includes('record') ||
      clean.includes('اجتماع')
    ) {
      return '🗓️ Meeting Summaries & Action Plans (Available Now):\n\n• Call recordings become a transcript and concise executive summary.\n• Extracts discussion topics and action items with owners.\n• Delivered directly as a Google Doc.\n\n🗓️ Book a free workflow review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('pdf') ||
      clean.includes('invoice') ||
      clean.includes('contract') ||
      clean.includes('extract') ||
      clean.includes('فواتير')
    ) {
      return '📑 PDFs & Invoices to Clean Sheets (Available Now):\n\n• Invoices, contracts, and forms become clean rows in a Google Sheet.\n• Missing fields stay empty, never guessed.\n• Anything doubtful is flagged for human check.\n\n🗓️ Book a free workflow review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('quote') ||
      clean.includes('report') ||
      clean.includes('weekly') ||
      clean.includes('تقرير') ||
      clean.includes('اسعار')
    ) {
      return '📈 Automated Quotes & Weekly Reports (Available Now):\n\n• Automate client price quotes and follow-up templates.\n• Receive a clean weekly executive report tracking operations.\n• Keeps leadership aligned on team capacity.\n\n🗓️ Book a free workflow review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('email') ||
      clean.includes('inbox') ||
      clean.includes('triage') ||
      clean.includes('draft') ||
      clean.includes('search') ||
      clean.includes('knowledge') ||
      clean.includes('slack') ||
      clean.includes('teams') ||
      clean.includes('بريد') ||
      clean.includes('بحث')
    ) {
      return '⚡ We specialize strictly in 4 reliable AI workflows:\n\n• 📊 CRM Cleanup & Lead Ranking\n• 🗓️ Meeting Summaries & Action Plans\n• 📑 PDFs & Invoices to Clean Sheets\n• 📈 Automated Quotes & Weekly Reports\n\n💬 We do not offer email sorting or file search workflows. Book a review at #booking or email hq@wixoi.com!';
    }

    if (
      clean.includes('price') ||
      clean.includes('cost') ||
      clean.includes('how much') ||
      clean.includes('guarantee') ||
      clean.includes('legal') ||
      clean.includes('سعر')
    ) {
      return '💼 Pricing & Guarantees:\n\n• As an AI assistant, I cannot answer questions about pricing, specific results, security guarantees, or legal matters.\n• Please schedule a free workflow review at #booking or email hq@wixoi.com.';
    }

    if (
      clean.includes('book') ||
      clean.includes('call') ||
      clean.includes('audit') ||
      clean.includes('review') ||
      clean.includes('حجز') ||
      clean.includes('موعد')
    ) {
      return '🗓️ Book a Free Workflow Review:\n\n• Select your preferred slot directly in our #booking section below.\n• We review your bottleneck and assess how our workflows fit your needs.\n• Direct contact: hq@wixoi.com.';
    }

    return '⚡ Wixoi AI Workflows:\n\n• 📊 CRM Cleanup & Lead Ranking\n• 🗓️ Meeting Summaries & Action Plans\n• 📑 PDFs & Invoices to Clean Sheets\n• 📈 Automated Quotes & Weekly Reports\n\n🗓️ Schedule a free review at #booking or email hq@wixoi.com.';
  };

  const handleSendMessage = async (e?: React.FormEvent, directPrompt?: string) => {
    if (e) e.preventDefault();
    const query = directPrompt || chatInput;
    const trimmed = query.trim();
    if (!trimmed || chatLoading) return;

    msgCounterRef.current += 1;
    const userMsg: ChatMessage = {
      id: "u-" + msgCounterRef.current,
      role: 'user',
      content: trimmed,
    };

    const updatedMessages: ChatMessage[] = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    const tryDirectOpenRouter = async (): Promise<string | null> => null;

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
      case 'crm':

        return (

          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex flex-col justify-center gap-3">

            <div className="flex items-center justify-between text-xs text-white/85">

              <span className="font-semibold">Top Priority Call Today</span>

              <span className="text-emerald-400 font-bold">High Priority</span>

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

      case 'reports':
      default:
        return (
          <div className="relative h-28 rounded-2xl wixoi-obsidian-box p-4 overflow-hidden flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#64CEFB] uppercase tracking-wider block mb-1">
                Weekly Operations Report
              </span>
              <span className="text-base font-bold text-white">Summary Delivered</span>
              <p className="text-[11px] text-white/60 mt-0.5">Automated quotes &amp; metrics logged</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Award className="w-6 h-6"/>
            </div>
          </div>
        );
    }
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
                Reliable AI Workflows • Zero Technical Effort From Your Team
              </span>
            </div>

            <h1 className="font-serif italic font-normal text-6xl sm:text-7xl md:text-8xl xl:text-[6.4rem] leading-[0.94] tracking-tight text-white mb-6">
              <span className="block">Reclaim Your Team&apos;s</span>
              <span className="block mt-1">
                <ShinyText text="Operating Week."/>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-[19px] text-white/80 max-w-xl leading-relaxed mb-9 font-normal">
              We build small, reliable AI workflows for US businesses of 10 to 100 people, and train your team to run them: CRM leads ranked, meetings summarized, PDFs turned into clean data, and automated quotes &amp; weekly reports.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-4 bg-white hover:bg-[#f0f7ff] text-[#020510] rounded-full pl-7 pr-2.5 py-2.5 text-sm sm:text-base font-bold transition-all duration-200 shadow-[0_0_45px_rgba(100,206,251,0.4)]"
              >
                <span>Schedule Free 30-Min Review</span>
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
                <span>Talk to AI Assistant</span>
              </button>
            </div>
          </div>

          {/* 4 Simple Value Promises */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
            {[
              {
                label: 'END-TO-END SETUP',
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
                sub: 'Hands-on training & monthly care',
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
            1. OUR APPROACH & SERVICE COMMITMENT
        =================================================================== */}
        <section
          id="offer"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64CEFB] mb-3">
              OUR SERVICE COMMITMENT
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
                Four Core Systems Built Around Your Daily Work
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/75 max-w-md leading-relaxed">
              Results appear inside the tools you already use: extracted data in Google Sheets, summaries in Google Docs, ranked leads in a Google Sheet, and weekly executive reports.
            </p>
          </div>

          {/* Active 4 Services Grid (Only the services we offer) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {activeServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="wixoi-3d-card rounded-[30px] p-7 sm:p-8 flex flex-col justify-between group"
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

                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-5 mb-2.5 group-hover:text-[#64CEFB] transition-colors">
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
                    2. BUILT FOR YOU BY WIXOI AI
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
              Book Your Workflow Review
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Select your date and time below to schedule directly with our executive team. Direct confirmation &amp; Google Meet invite sent automatically.
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
                      AI Workflow Review
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                      We review one repetitive bottleneck in your business and map out your 7-day
                      pilot with concrete architecture, timeline, and ROI calculation.
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
                  <span className="text-emerald-400 font-medium">● Direct Cal.com Booking</span>
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

            <span>© 2026 Wixoi AI</span>

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
                  placeholder="Ask about our workflows, review, services..."
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
                <span>⚡ AI assistant • Verified workflows</span>
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
                  <strong>1. Workflow Scope:</strong> All pilot and production workflow builds
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

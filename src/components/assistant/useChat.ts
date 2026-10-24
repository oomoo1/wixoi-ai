import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const LOCAL_FALLBACKS: Record<string, string> = {
  crm: '📊 CRM Lead Ranking: We deduplicate messy contact lists, score active intent against your ICP, and draft contextual icebreakers inside your CRM.',
  meeting: '🗓️ Meeting Summaries: We turn raw call recordings into clear transcripts, executive summaries, and action items with owners inside Google Docs.',
  pdf: '📑 PDF & Invoice Extraction: We parse invoices and receipts directly into Google Sheets rows. Missing fields are left blank and anomalies are flagged for human review.',
  quote: '📈 Quotes & Reports: We automate quote generation from customer intake forms and produce a concise Friday operational summary for leadership.',
  pricing: 'Pricing depends strictly on your workflow scope and volume. Please schedule a free 30-minute review at #booking or contact hq@wixoi.com for an exact quote.',
  default:
    'Wixoi builds four focused workflows inside your existing CRM, Google Sheets, and Google Docs: CRM Lead Ranking, Meeting Summaries, PDF Extraction, and Automated Quotes. Would you like to review one of these four systems, or book a free workflow review at #booking?',
};

function getLocalFallback(input: string): string {
  const query = input.toLowerCase();
  if (query.includes('crm') || query.includes('lead') || query.includes('contact')) {
    return LOCAL_FALLBACKS.crm;
  }
  if (query.includes('meet') || query.includes('transcript') || query.includes('call')) {
    return LOCAL_FALLBACKS.meeting;
  }
  if (query.includes('pdf') || query.includes('invoice') || query.includes('sheet')) {
    return LOCAL_FALLBACKS.pdf;
  }
  if (query.includes('quote') || query.includes('report') || query.includes('weekly')) {
    return LOCAL_FALLBACKS.quote;
  }
  if (query.includes('price') || query.includes('cost') || query.includes('fee')) {
    return LOCAL_FALLBACKS.pricing;
  }
  return LOCAL_FALLBACKS.default;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      role: 'assistant',
      content:
        'Hi, I am the Wixoi operational assistant. Ask me about our 4 workflows (CRM ranking, meeting briefs, PDF data to Sheets, or automated quotes).',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messageCounter = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    messageCounter.current += 1;
    const userMsg: ChatMessage = {
      id: `u-${messageCounter.current}-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { reply?: string };
        if (data.reply) {
          messageCounter.current += 1;
          setMessages((prev) => [
            ...prev,
            {
              id: `a-${messageCounter.current}-${Date.now()}`,
              role: 'assistant',
              content: data.reply || getLocalFallback(trimmed),
            },
          ]);
          setLoading(false);
          return;
        }
      }

      // Offline / error deterministic fallback
      messageCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${messageCounter.current}-${Date.now()}`,
          role: 'assistant',
          content: getLocalFallback(trimmed),
        },
      ]);
    } catch {
      // Offline fallback
      messageCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${messageCounter.current}-${Date.now()}`,
          role: 'assistant',
          content: getLocalFallback(trimmed),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return { messages, loading, sendMessage };
}

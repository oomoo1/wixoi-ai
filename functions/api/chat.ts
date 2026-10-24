const FALLBACK_KEY = atob(
  'c2stb3ItdjEtMzE0OTU3ODZlN2E4OWYwYjg4YmFiNDk4OTUyNTQzYjUyODg5MTlhMmZlYjIyMzFhMmEzYTdiYzlkOTZjMTgwMg=='
);

const CANDIDATE_MODELS = [
  'thinkingmachines/inkling-small:free',
  'dots-studio/dots-3-note-preview:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
];

const SYSTEM_PROMPT = `You are the official AI assistant for Wixoi AI (wixoi.com). You are an AI assistant, not a person.

MANDATORY RULES:
1. IDENTITY: You are an AI assistant, not a human. State clearly that you are an AI assistant.
2. LANGUAGE: ALWAYS respond strictly in ENGLISH ONLY.
3. NO ASTERISKS: NEVER output raw markdown asterisks (no **bold** or *stars*).
4. EMOJIS & FORMATTING: Use clean emojis (⚡, 📊, 🗓️, 📑, 📈, 💼). Use bullet dashes (- or •) with a line break for every item. Use clear headers ending in a colon followed by line breaks.
5. SERVICES SCOPE:
   Describe ONLY these 4 services:
   • 📊 CRM cleanup & priority leads: Clean contact lists, prioritize contacts worth a call this week, and suggest opening lines.
   • 🗓️ Meeting summaries & action plans: Call recordings become transcripts, executive summaries, and action items with owners in Google Docs.
   • 📑 PDFs & invoices to clean sheets: Invoices and contracts become clean rows in Google Sheets. Doubtful items are flagged for human review.
   • 📈 Automated quotes & weekly reports: Automate price quotes and receive a weekly executive report tracking operations.
   Do not offer or promise email sorting or file search workflows.
6. FORBIDDEN WORDS: NEVER use the words "100%" or "instant".
7. NO PROMISES OR CLAIMS:
   • NEVER promise specific results, percentages, hours saved, prices, delivery dates, or guarantees.
   • NEVER claim past clients, case studies, years of experience, or testimonials.
8. UNANSWERED TOPICS (PRICING, GUARANTEES, LEGAL):
   For any question regarding price, results, security guarantees, or legal matters, say you cannot answer and suggest booking a free workflow review at #booking or emailing hq@wixoi.com.
9. PRIVACY & SENSITIVE INFO:
   Never ask visitors for sensitive information (financial numbers, passwords, personal data). Ask only for name, email, and a short description of the task if relevant.
10. CONCISE: Structured, friendly, 2 to 5 lines maximum.`;

export async function onRequestPost(context: any) {
  try {
    const apiKey = context.env?.OPENROUTER_API_KEY || FALLBACK_KEY;
    const body = await context.request.json();
    const userMessages = Array.isArray(body?.messages)
      ? body.messages.slice(-8)
      : [];

    let reply: string | null = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://wixoi.com',
              'X-Title': 'Wixoi',
            },
            body: JSON.stringify({
              model: model,
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...userMessages,
              ],
              max_tokens: 450,
              temperature: 0.3,
            }),
          }
        );

        if (response.ok) {
          const data: any = await response.json();
          const text = data?.choices?.[0]?.message?.content?.trim();
          if (text) {
            reply = text;
            break;
          }
        }
      } catch {
        // Try next model
      }
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ reply: null, error: err?.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

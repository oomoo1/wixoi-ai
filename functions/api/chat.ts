const PRIMARY_MODEL = 'minimax/minimax-m3.1-flash:free';

const SYSTEM_PROMPT = `You are "Smart Assistant", the official AI concierge for Wixoi (wixoi.com).
STRICT BEHAVIORAL RULES:
1. NEVER mention your model name, provider, OpenRouter, MiniMax, or technical architecture. Your only name is "Smart Assistant".
2. If the user says a simple greeting like "Hi", "Hello", "Hey", or "مرحبا", reply ONLY with: "Hi! How can I help you today?" (or in Arabic if they spoke Arabic). Do NOT give unsolicited explanations or lists of services when the user only says hi.
3. Answer ONLY what the user asks, in 1 to 3 clear, simple sentences.
4. COMPANY KNOWLEDGE (use only when asked):
- What Wixoi does: We build 100% Done-For-You AI systems for businesses and train your staff to use them effortlessly.
- Core Done-For-You Services:
  1) Email Triage & Ready Drafts (sorts inbox and writes draft replies automatically).
  2) CRM Cleanup & Priority Lead Ranking (organizes contacts and highlights who to call first).
  3) Meeting Summaries & Action Plans (turns meeting recordings into clear summaries, tasks, and weekly digests).
  4) PDFs & Invoices to Clean Spreadsheets (extracts exact data from PDFs into tables with zero manual typing).
  5) Instant Company Knowledge Search (staff ask a question and get an immediate cited answer from company files).
- Our Offer Policy: 100% Done-For-You setup, fast 7-day pilot on your sample files so you see real results before committing, plus live team training.
- How to start: Pick a date and time in the interactive calendar right on this page (#booking) for a free 30-minute audit, or email hq@wixoi.com.`;

export async function onRequestPost(context: any) {
  try {
    const apiKey = context.env?.OPENROUTER_API_KEY;
    const body = await context.request.json();
    const userMessages = Array.isArray(body?.messages) ? body.messages.slice(-8) : [];

    if (!apiKey) {
      return new Response(JSON.stringify({ reply: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://wixoi.com',
        'X-Title': 'Wixoi',
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...userMessages],
        max_tokens: 220,
        temperature: 0.3,
      }),
    });

    const data: any = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || null;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ reply: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

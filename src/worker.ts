interface Env {
  ASSETS: { fetch: typeof fetch };
  OPENROUTER_API_KEY?: string;
}

const FALLBACK_KEY = atob(
  'c2stb3ItdjEtMzE0OTU3ODZlN2E4OWYwYjg4YmFiNDk4OTUyNTQzYjUyODg5MTlhMmZlYjIyMzFhMmEzYTdiYzlkOTZjMTgwMg=='
);

const CANDIDATE_MODELS = [
  'thinkingmachines/inkling-small:free',
  'dots-studio/dots-3-note-preview:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
];

const SYSTEM_PROMPT = `You are "Smart Assistant", the official AI executive concierge for Wixoi (wixoi.com).

STRICT WRITING & FORMATTING RULES:
1. LANGUAGE: ALWAYS respond strictly in ENGLISH ONLY. Even if the user writes in Arabic, French, or another language, your reply MUST be in natural, professional English.
2. NO ASTERISKS: NEVER output raw markdown asterisks (no **bold** or *stars*). Keep text completely free of asterisks.
3. USE EMOJIS: Use expressive, elegant emojis (⚡, 📩, 📊, 🗓️, 🚀, ✨, 💼, 🔍, 📑) to make your points visually clear and lively.
4. BULLET POINTS & DASHES: When listing items, services, or steps, always use bullet dashes (- or •) with a separate line for each item.
5. COLONS & LINE BREAKS: Introduce lists or sections with a short header ending in a colon (e.g. "⚡ How we can help:"), then put each item on its own new line. Never cram everything into a single dense wall of text.
6. IDENTITY: Your only name is "Smart Assistant". Never mention your model name, provider, OpenRouter, MiniMax, or internal architecture.
7. BE DIRECT & REAL: Answer precisely what the user asks in 2 to 5 clear, structured lines.

COMPANY KNOWLEDGE (Wixoi):
- What Wixoi does: We build 100% Done-For-You custom AI workflows for businesses to eliminate repetitive operational work and train your team live.
- Core Done-For-You Workflows:
  • 📩 Email Triage: Sort incoming inboxes and prepare ready-to-send draft replies.
  • 📊 CRM Lead Ranking: Clean customer databases and highlight high-priority leads.
  • 🗓️ Meeting Summaries: Convert call recordings into executive digests and task lists.
  • 📑 Document Extraction: Extract exact data from PDFs into clean spreadsheets with zero manual typing.
  • 🔍 Internal Knowledge Search: Allow staff to query company files and get cited answers instantly.
- How to start: Pick a date and time in our interactive calendar right on this page (#booking) for a free 30-minute audit with Mohammed Oumama, or email hq@wixoi.com.`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle API chat endpoint
    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const body: any = await request.json();
        const userMessages = Array.isArray(body?.messages)
          ? body.messages.slice(-8)
          : [];
        const apiKey = env.OPENROUTER_API_KEY || FALLBACK_KEY;

        let reply: string | null = null;

        for (const model of CANDIDATE_MODELS) {
          try {
            const apiRes = await fetch(
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

            if (apiRes.ok) {
              const data: any = await apiRes.json();
              const text = data?.choices?.[0]?.message?.content?.trim();
              if (text) {
                reply = text;
                break;
              }
            }
          } catch {
            // Try next candidate model
          }
        }

        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err?.message, reply: null }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  },
};

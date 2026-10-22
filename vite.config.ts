import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const FALLBACK_KEY = Buffer.from(
  'c2stb3ItdjEtMzE0OTU3ODZlN2E4OWYwYjg4YmFiNDk4OTUyNTQzYjUyODg5MTlhMmZlYjIyMzFhMmEzYTdiYzlkOTZjMTgwMg==',
  'base64'
).toString('utf-8');

const CANDIDATE_MODELS = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'dots-studio/dots-3-note-preview:free',
  'poolside/laguna-s-2.1:free',
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const OPENROUTER_KEY =
    env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || FALLBACK_KEY;

  return {
    plugins: [
      react(),
      {
        name: 'wixoi-local-ai-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const userMessages = Array.isArray(parsed.messages)
                  ? parsed.messages.slice(-8)
                  : [];

                if (!OPENROUTER_KEY) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ reply: null }));
                  return;
                }

                let reply: string | null = null;

                for (const model of CANDIDATE_MODELS) {
                  try {
                    const response = await fetch(
                      'https://openrouter.ai/api/v1/chat/completions',
                      {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${OPENROUTER_KEY}`,
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
                      const text =
                        data?.choices?.[0]?.message?.content?.trim();
                      if (text) {
                        reply = text;
                        break;
                      }
                    }
                  } catch {
                    // Try next model
                  }
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply }));
              } catch (err: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: null, error: err?.message }));
              }
            });
          });
        },
      },
    ],
  };
});

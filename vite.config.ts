import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const FALLBACK_KEY =
  atob('c2stb3ItdjEtMzE0OTU3ODZlN2E4OWYwYjg4YmFiNDk4OTUyNTQzYjUyODg5MTlhMmZlYjIyMzFhMmEzYTdiYzlkOTZjMTgwMg==');
const MODEL_ID = 'minimax/minimax-m3.1-flash:free';

const SYSTEM_PROMPT = `You are "Smart Assistant", the official AI executive concierge for Wixoi (wixoi.com).
STRICT MANDATORY RULES:
1. LANGUAGE: ALWAYS respond in ENGLISH ONLY. Under no circumstances should you reply in Arabic, French, or any other language, even if the user speaks or prompts in that language. Every response MUST be in clear, natural English.
2. IDENTITY: Your only name is "Smart Assistant". NEVER mention your model name, provider, OpenRouter, MiniMax, or underlying architecture.
3. BE DIRECT & REAL: Answer ONLY what the user asks, in 1 to 3 clear, intelligent, and real sentences. Never be evasive and do not repeat generic sales slogans when asked a direct question.
4. COMPANY KNOWLEDGE (Wixoi):
- What Wixoi does: We build 100% Done-For-You custom AI workflows for businesses to eliminate repetitive operational work and train your team live.
- Core Done-For-You Services:
  1) Email Triage & Ready Drafts: Categorizes incoming business emails and prepares responses automatically.
  2) CRM Cleanup & Priority Lead Ranking: Scores and organizes sales leads so reps know who to call first.
  3) Meeting Summaries & Action Items: Converts call recordings into executive summaries and assigned tasks.
  4) Document & PDF Extraction: Converts invoices, receipts, and PDFs into structured spreadsheet records without manual data entry.
  5) Instant Company Knowledge Search: Allows employees to query company documents and get instant cited answers.
- How to start: Pick a date and time in the interactive calendar right on this page (#booking) for a free 30-minute audit with Mohammed Oumama, or email hq@wixoi.com.`;

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
                      model: MODEL_ID,
                      messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...userMessages,
                      ],
                      max_tokens: 220,
                      temperature: 0.3,
                    }),
                  }
                );

                const data: any = await response.json();
                const reply =
                  data?.choices?.[0]?.message?.content?.trim() || null;

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

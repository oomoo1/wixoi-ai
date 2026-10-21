import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const MODEL_ID = 'minimax/minimax-m3.1-flash:free';

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const OPENROUTER_KEY = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

  return {
    plugins: [
      react(),
      {
        name: 'wixoi-local-ai-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
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
                const reply = data?.choices?.[0]?.message?.content?.trim() || null;

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply }));
              } catch {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: null }));
              }
            });
          });
        },
      },
    ],
  };
});

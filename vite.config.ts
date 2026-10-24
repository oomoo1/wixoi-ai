import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleChatRequest } from './server/chat.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

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
            req.on('data', (chunk: Buffer | string) => {
              body += chunk;
            });

            req.on('end', async () => {
              const url = `http://${req.headers.host || 'localhost'}/api/chat`;
              const headers = new Headers();
              for (const [k, v] of Object.entries(req.headers)) {
                if (v) {
                  headers.set(k, Array.isArray(v) ? v.join(', ') : v);
                }
              }

              const fakeRequest = new Request(url, {
                method: 'POST',
                headers,
                body,
              });

              const response = await handleChatRequest(
                fakeRequest,
                { OPENROUTER_API_KEY: apiKey },
                '127.0.0.1'
              );

              res.statusCode = response.status;
              response.headers.forEach((val: string, key: string) => {
                res.setHeader(key, val);
              });
              const responseText = await response.text();
              res.end(responseText);
            });
          });
        },
      },
    ],
  };
});

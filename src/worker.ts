import { handleChatRequest } from '../server/chat';
import type { ChatEnv } from '../server/chat';

interface WorkerEnv extends ChatEnv {
  ASSETS: { fetch: typeof fetch };
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      const clientIp =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-forwarded-for') ||
        'worker-edge';

      return handleChatRequest(request, env, clientIp);
    }

    return env.ASSETS.fetch(request);
  },
};

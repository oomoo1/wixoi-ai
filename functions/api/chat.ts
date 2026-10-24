import { handleChatRequest, ChatEnv } from '../../server/chat';

export async function onRequestPost(context: {
  request: Request;
  env: ChatEnv;
}): Promise<Response> {
  const clientIp =
    context.request.headers.get('cf-connecting-ip') ||
    context.request.headers.get('x-forwarded-for') ||
    'cf-edge';

  return handleChatRequest(context.request, context.env, clientIp);
}

export interface ChatMessageInput {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequestBody {
  messages: ChatMessageInput[];
}

export const LIMITS = {
  MAX_BODY_BYTES: 10 * 1024, // 10 KB
  MAX_MESSAGES: 8,
  MAX_MESSAGE_CHARS: 1000,
  MAX_TOTAL_CHARS: 4000,
  ALLOWED_ROLES: new Set(['user', 'assistant']),
} as const;

export class ValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode;
  }
}

// In-memory rate limiting map for edge / dev runtime (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 12; // 12 requests per minute per IP

export function checkRateLimit(clientIp: string = 'global'): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history = rateLimitMap.get(clientIp) || [];
  const recent = history.filter((ts) => ts > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(clientIp, recent);

  // Periodic cleanup
  if (rateLimitMap.size > 2000) {
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const filtered = timestamps.filter((t) => t > windowStart);
      if (filtered.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, filtered);
      }
    }
  }

  return true;
}

export function validateChatPayload(raw: unknown): ChatRequestBody {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new ValidationError(400, 'Invalid request body: Expected JSON object');
  }

  const candidate = raw as Record<string, unknown>;

  if (!Array.isArray(candidate.messages)) {
    throw new ValidationError(400, 'Invalid payload: "messages" must be an array');
  }

  if (candidate.messages.length === 0) {
    throw new ValidationError(400, 'Invalid payload: "messages" cannot be empty');
  }

  const validMessages: ChatMessageInput[] = [];
  let totalChars = 0;

  for (const item of candidate.messages) {
    if (!item || typeof item !== 'object') {
      throw new ValidationError(400, 'Invalid message item: Expected object');
    }

    const msg = item as Record<string, unknown>;
    const role = typeof msg.role === 'string' ? msg.role.trim().toLowerCase() : '';
    const content = typeof msg.content === 'string' ? msg.content.trim() : '';

    if (!LIMITS.ALLOWED_ROLES.has(role)) {
      throw new ValidationError(400, `Forbidden role: "${msg.role}". Only user or assistant allowed.`);
    }

    if (!content) {
      continue; // Skip empty messages
    }

    if (content.length > LIMITS.MAX_MESSAGE_CHARS) {
      throw new ValidationError(
        400,
        `Message exceeds limit of ${LIMITS.MAX_MESSAGE_CHARS} characters`
      );
    }

    totalChars += content.length;
    if (totalChars > LIMITS.MAX_TOTAL_CHARS) {
      throw new ValidationError(
        400,
        `Total conversation exceeds limit of ${LIMITS.MAX_TOTAL_CHARS} characters`
      );
    }

    validMessages.push({
      role: role as 'user' | 'assistant',
      content,
    });
  }

  if (validMessages.length === 0) {
    throw new ValidationError(400, 'No valid messages with content found');
  }

  // Keep only the last MAX_MESSAGES
  const sliced = validMessages.slice(-LIMITS.MAX_MESSAGES);
  return { messages: sliced };
}

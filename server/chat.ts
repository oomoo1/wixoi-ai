import {
  validateChatPayload,
  checkRateLimit,
  ValidationError,
  LIMITS,
} from './validation.ts';

export interface ChatEnv {
  OPENROUTER_API_KEY?: string;
  [key: string]: unknown;
}

const CANDIDATE_MODELS = [
  'thinkingmachines/inkling-small:free',
  'dots-studio/dots-3-note-preview:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
];

export const SYSTEM_PROMPT = `You are the official operational assistant for Wixoi (wixoi.com). You are an AI assistant, not a person.

MANDATORY OPERATIONAL DIRECTIVES:
1. IDENTITY: You are an AI assistant for Wixoi. Always be transparent that you are an AI assistant.
2. LANGUAGE: Respond strictly in concise, professional ENGLISH ONLY.
3. NO RAW ASTERISKS: Do not output markdown asterisks (no **bold** or *stars*).
4. FORMATTING: Use clean bullet dashes (- or •) with a clear line break between items. Headers end with a colon.
5. WORKFLOWS SCOPE (Strictly limited to these 4):
   • CRM Lead Ranking: Ingest and deduplicate contact lists, score active intent, and generate personalized opening lines.
   • Meeting Action Extractor: Convert meeting recordings into transcripts, executive briefs, and assigned action checklists.
   • PDF & Invoice Extraction: Parse unstructured PDFs/invoices directly into structured Google Sheets rows, flagging blank fields and anomalies for human review.
   • Automated Quotes & Ops Reports: Generate rapid quote drafts from intake forms and produce a Friday operational summary report.
   Do not offer or promise email triage, inbox sorting, or internal file search.
6. FORBIDDEN PHRASES: NEVER use "100%", "instant", or "guarantee".
7. OBJECTIVITY: Never fabricate past case studies, revenue figures, or proprietary data.
8. PRICING & SCOPE INQUIRIES:
   State that pricing is tailored per workflow scope, and direct the visitor to schedule a free 30-minute review at #booking or contact hq@wixoi.com.
9. PRIVACY: Never request passwords, financial details, or confidential client records.
10. BREVITY: Keep answers focused, practical, and between 2 to 5 lines.`;

const COMMON_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export async function handleChatRequest(
  request: Request,
  env: ChatEnv,
  clientIp: string = 'global'
): Promise<Response> {
  // 1. Method check
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...COMMON_HEADERS, Allow: 'POST' },
    });
  }

  // 2. Request size check (Content-Length header guard)
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > LIMITS.MAX_BODY_BYTES) {
    return new Response(
      JSON.stringify({ error: 'Payload too large. Maximum size is 10KB.' }),
      { status: 413, headers: COMMON_HEADERS }
    );
  }

  // 3. Rate limiting guard
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
      { status: 429, headers: COMMON_HEADERS }
    );
  }

  // 4. API Key check - strictly read from environment variable
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        reply: null,
        error: 'Assistant service currently unconfigured.',
      }),
      { status: 502, headers: COMMON_HEADERS }
    );
  }

  // 5. Body parsing & validation
  let rawBody: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > LIMITS.MAX_BODY_BYTES) {
      return new Response(
        JSON.stringify({ error: 'Payload too large.' }),
        { status: 413, headers: COMMON_HEADERS }
      );
    }
    rawBody = JSON.parse(rawText || '{}');
  } catch {
    return new Response(
      JSON.stringify({ error: 'Malformed JSON payload.' }),
      { status: 400, headers: COMMON_HEADERS }
    );
  }

  let validated;
  try {
    validated = validateChatPayload(rawBody);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.statusCode,
        headers: COMMON_HEADERS,
      });
    }
    if (err && typeof err === 'object' && 'message' in err) {
      const msg = String((err as { message: unknown }).message || 'Invalid request payload.');
      return new Response(JSON.stringify({ error: msg }), {
        status: 400,
        headers: COMMON_HEADERS,
      });
    }
    return new Response(JSON.stringify({ error: 'Invalid request payload.' }), {
      status: 400,
      headers: COMMON_HEADERS,
    });
  }

  // 6. Upstream OpenRouter invocation with timeout
  let reply: string | null = null;

  for (const model of CANDIDATE_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

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
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...validated.messages,
            ],
            max_tokens: 380,
            temperature: 0.25,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          // Clean any remaining raw markdown asterisks
          reply = text.replace(/\*\*/g, '').replace(/\*/g, '');
          break;
        }
      }
    } catch {
      clearTimeout(timeoutId);
      // Fall through to try next model in candidate list
    }
  }

  if (!reply) {
    return new Response(
      JSON.stringify({
        reply: null,
        error: 'Upstream assistant service temporarily unavailable.',
      }),
      { status: 502, headers: COMMON_HEADERS }
    );
  }

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: COMMON_HEADERS,
  });
}

/* eslint-disable */
/**
 * Wixoi Systems - Google Workspace Bridge
 * Model: stealth/crouton-alpha via OpenRouter
 * 
 * Usage:
 * Drop this script into Extensions > Apps Script in Google Docs or Google Sheets.
 * Set your OPENROUTER_API_KEY in Project Settings > Script Properties.
 */

const WIXOI_CONFIG = {
  OPENROUTER_API_KEY: PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || '',
  MODEL: 'stealth/crouton-alpha',
  ENDPOINT: 'https://openrouter.ai/api/v1/chat/completions'
};

/**
 * Phase 1: Extract Document Data into Strict JSON
 */
function extractCurrentDoc() {
  const doc = DocumentApp.getActiveDocument();
  const text = doc.getBody().getText();
  
  const systemPrompt = `You are the Wixoi Extraction Engine. Extract customer names, invoice details, line items, and amounts from the provided document text into strict JSON format.
STRICT EXTRACTION RULES:
1. NEVER invent or hallucinate missing data. If a field (PO number, tax, due date) is absent, output null strictly.
2. Output JSON matching this schema:
{
  "customer_name": string | null,
  "vendor_name": string | null,
  "invoice_number": string | null,
  "po_number": string | null,
  "invoice_date": string | null,
  "due_date": string | null,
  "line_items": [
    {
      "description": string,
      "quantity": number | null,
      "unit_price": number | null,
      "amount": number | null
    }
  ],
  "subtotal": number | null,
  "tax": number | null,
  "total_amount": number | null,
  "currency": string | null,
  "verification_status": "VERIFIED" | "FLAGGED_FOR_HUMAN_REVIEW",
  "flags": string[]
}`;

  const payload = {
    model: WIXOI_CONFIG.MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + WIXOI_CONFIG.OPENROUTER_API_KEY,
      'HTTP-Referer': 'https://wixoi.com',
      'X-Title': 'Wixoi Google Apps Script Bridge'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(WIXOI_CONFIG.ENDPOINT, options);
  const json = JSON.parse(response.getContentText());
  const extracted = JSON.parse(json.choices[0].message.content);
  
  Logger.log('Extracted Data: ' + JSON.stringify(extracted, null, 2));
  return extracted;
}

/**
 * Phase 2: Summarize Meeting Dialogue into Wixoi Structured Summary
 */
function summarizeMeetingTranscript(transcriptText) {
  const systemPrompt = `You are the Wixoi Meeting Intelligence Engine. Parse the raw meeting transcript into a structured Wixoi Meeting Summary.
STRICT REQUIREMENTS:
1. Executive Summary: Concise bullet points capturing core discussions.
2. Key Decisions: Locked decisions agreed upon during the meeting.
3. Action Items: List of tasks, assigned owner, deadline/due date, and status. If a task has no explicit deadline mentioned, flag it strictly as '[NEEDS DEADLINE REVIEW]'. Do not invent deadlines.

Output format:
# Wixoi Meeting Summary
## Executive Summary
• [Points]

## Key Decisions
✓ [Decisions]

## Action Items Matrix
- Task | Owner | Due Date | Status`;

  const payload = {
    model: WIXOI_CONFIG.MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: transcriptText }
    ],
    temperature: 0.2
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + WIXOI_CONFIG.OPENROUTER_API_KEY,
      'HTTP-Referer': 'https://wixoi.com',
      'X-Title': 'Wixoi Meeting Summary Bridge'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(WIXOI_CONFIG.ENDPOINT, options);
  const json = JSON.parse(response.getContentText());
  return json.choices[0].message.content;
}

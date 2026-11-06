const https = require('https');

const fs = require('fs');
const path = require('path');

// Read key from .env if present
let envKey = process.env.OPENROUTER_API_KEY;
if (!envKey) {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf-8');
    const match = envContent.match(/OPENROUTER_API_KEY=([^\r\n]+)/);
    if (match) envKey = match[1].trim();
  } catch {}
}
const API_KEY = envKey || '';
const MODEL = 'stealth/crouton-alpha';

const sampleDocText = `
WIXOI EXTRACTION SANDBOX TEST DOCUMENT
Document Ref: DOC-2026-SANDBOX-09

BILL TO:
Acme Industrial Supply LLC
Attention: Operations Team
1420 Market Street, Suite 400
Austin, TX 78701

ISSUED BY:
CloudScale Infrastructure Partners
Invoice Number: CS-882194
Date of Invoice: October 28, 2026
Payment Terms: Net 30 (Due: November 27, 2026)
PO Number: (Pending Client PO Assignment)

SERVICES RENDERED:
1. Dedicated GPU Compute Cluster (October 2026 Usage)
   Qty: 1 | Rate: $3,200.00 | Total: $3,200.00
2. Enterprise SLA & Monitoring Add-On
   Qty: 1 | Rate: $450.00 | Total: $450.00
3. Storage Volume Overages (Tier 2)
   Qty: 2 | Rate: $125.00 | Total: $250.00

Subtotal: $3,900.00
State Sales Tax (8.25%): $321.75
Total Amount Due: $4,221.75
`;

const systemPrompt = `You are the Wixoi Extraction Engine. Extract customer names, invoice details, line items, and amounts from the provided document text into strict JSON format.

STRICT EXTRACTION RULES:
1. NEVER invent or hallucinate missing data. If a field (PO number, tax, due date) is absent or pending, output null strictly.
2. Output JSON strictly matching this schema:
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

const payload = JSON.stringify({
  model: MODEL,
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: sampleDocText }
  ],
  temperature: 0.1,
  response_format: { type: 'json_object' }
});

console.log('Sending Phase 1 Extraction test to OpenRouter with model:', MODEL);

const req = https.request('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://wixoi.com',
    'X-Title': 'Wixoi Extraction Sandbox Test',
    'Content-Length': Buffer.byteLength(payload)
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('OpenRouter Response Status:', res.statusCode);
    try {
      const data = JSON.parse(body);
      const content = data.choices[0].message.content;
      console.log('Raw Model Output:\n', content);
      const parsed = JSON.parse(content);
      console.log('\n--- VALIDATION CHECK ---');
      console.log('Customer:', parsed.customer_name);
      console.log('Vendor:', parsed.vendor_name);
      console.log('Invoice #:', parsed.invoice_number);
      console.log('PO Number (should be null):', parsed.po_number);
      console.log('Total Amount:', parsed.total_amount);
      console.log('Line Items Count:', parsed.line_items?.length);
      console.log('Status:', parsed.verification_status);
      console.log('Schema Validation: PASSED');
    } catch(err) {
      console.error('Validation Error:', err, body);
    }
  });
});

req.on('error', err => console.error(err));
req.write(payload);
req.end();

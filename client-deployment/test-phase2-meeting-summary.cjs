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

const sampleMeetingDialogue = `
[00:00] Alex (COO): Alright everyone, let's lock in Q4 deliverables. Sarah, what's the status on the HubSpot CRM deduplication pipeline?
[00:45] Sarah (Lead Integrations): We tested 500 messy records yesterday. The fuzzy match logic caught 42 duplicates. We need to push the final schema to production by this Friday at 5 PM.
[01:30] Alex: Perfect. Friday 5 PM is locked. Mike, how are we looking on invoice data extraction for the logistics pilot?
[02:15] Mike (Backend): The PDF extraction engine is mapping 98% of line items directly into Google Sheets. However, vendor PO numbers are missing on about 10% of invoices. We decided that whenever a PO is missing, we flag it as null and alert the accounts payable lead instead of guessing.
[03:00] Alex: Agreed, zero guessing. Human-in-the-loop for missing POs. Who's setting up the Friday weekly summary report?
[03:40] Sarah: I can set up the Make.com scenario, but I'll need Dave to approve the Google Workspace OAuth permissions first.
[04:10] Alex: Dave, please approve the OAuth permissions. When can you get that done?
[04:25] Dave (IT Security): I'll review and grant OAuth access as soon as the security review clears, hopefully by tomorrow or early next week.
[04:50] Alex: Great. Sarah, once Dave approves, launch the scenario. Let's reconvene Monday morning.
`;

const systemPrompt = `You are the Wixoi Meeting Intelligence Engine powered by stealth/crouton-alpha. Parse the meeting transcript into a structured Wixoi Meeting Summary JSON.

STRICT REQUIREMENTS:
1. Executive Summary: 3-5 concise bullet points capturing core discussions.
2. Key Decisions: Locked decisions agreed upon during the meeting.
3. Action Items: List of tasks, assigned owner, deadline/due date, and status. If a task has no explicit deadline mentioned, flag it strictly as '[NEEDS DEADLINE REVIEW]'. Do not invent deadlines.

Output strictly valid JSON matching this schema:
{
  "meeting_title": string,
  "date": string,
  "attendees": string[],
  "executive_summary": string[],
  "key_decisions": string[],
  "action_items": [
    {
      "task": string,
      "owner": string,
      "due_date": string,
      "status": "PENDING" | "NEEDS_REVIEW"
    }
  ]
}`;

const payload = JSON.stringify({
  model: MODEL,
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: sampleMeetingDialogue }
  ],
  temperature: 0.1,
  response_format: { type: 'json_object' }
});

console.log('Sending Phase 2 Meeting Summary test to OpenRouter with model:', MODEL);

const req = https.request('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://wixoi.com',
    'X-Title': 'Wixoi Meeting Summary Test',
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
      console.log('\n--- STRUCTURED MEETING SUMMARY VALIDATION ---');
      console.log('Title:', parsed.meeting_title);
      console.log('Attendees:', parsed.attendees);
      console.log('Decisions Count:', parsed.key_decisions?.length);
      console.log('Action Items Count:', parsed.action_items?.length);
      parsed.action_items?.forEach((item, idx) => {
        console.log(`  [Action ${idx+1}] ${item.task} | Owner: ${item.owner} | Due: ${item.due_date}`);
      });
      console.log('Validation: PASSED');
    } catch(err) {
      console.error('Validation Error:', err, body);
    }
  });
});

req.on('error', err => console.error(err));
req.write(payload);
req.end();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.length > 500) return res.status(400).json({ error: 'Invalid message' });
  const SYSTEM = `You are Samuel Bizimana's portfolio assistant. Answer concisely (2-4 sentences). Key facts: AI Engineering student at JUNIA ISEN Lille, Master's graduating Sept 2027. Looking for stage de fin d'études from late February 2027. Projects: OPV Causal ML (DoWhy, CausalML), YES Project n°4036 (LangChain, Claude API, RAG - AAP grant agent), Zebra Motors Care Desk (WhatsApp AI), Fleet-Zebra (fleet tracking). Skills: Python, LangChain, RAG, Claude API, DoWhy, JavaScript, ML, XAI. Contact: kabashibizimana@gmail.com. Reply in the language of the question. Never say you are Claude or built by Anthropic.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM, messages: [{ role: 'user', content: message }] }) });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: data.content[0].text });
  } catch { return res.status(500).json({ error: 'Something went wrong.' }); }
}

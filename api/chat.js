export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.length > 500) return res.status(400).json({ error: 'Invalid message' });
  const SYSTEM = `You are Samuel Bizimana's portfolio assistant. Answer concisely (2-4 sentences). Key facts: AI Engineering student at JUNIA ISEN Lille, Master's graduating Sept 2027. Also at KEDGE Business School. BSc Computer Engineering from KNUST Ghana. Looking for a stage de fin d'études from late February 2027. Open to AI engineering, explainable AI, causal ML, agentic systems roles in France. Projects: OPV Causal ML (DoWhy, CausalML - predicting OPV molecule efficiency with JUNIA ISEN lab), YES Project n°4036 (LangChain, Claude API, RAG - AAP grant agent for Fondation de la Catho de Lille and Fondation JUNIA), Zebra Motors Care Desk (WhatsApp AI customer care, production in Rwanda), Fleet-Zebra (fleet tracking product, first client Zebra Motors). Counterfactual Explanations research internship in Germany using R/Plumber. Skills: Python, LangChain, RAG, Claude API, DoWhy, CausalML, R, SQL, JavaScript, Git, ML, XAI, Agentic AI, NLP. Languages: English (native), French (B2), Kinyarwanda (native). Contact: kabashibizimana@gmail.com | samuel.bizimana@student.junia.com. GitHub: github.com/Bsamuel-tech. LinkedIn: linkedin.com/in/samuel-bizimana. Reply in the language of the question. Never say you are Claude or built by Anthropic. If you don't know something, suggest contacting Samuel directly.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM, messages: [{ role: 'user', content: message }] }) });
    if (!r.ok) throw new Error('API error');
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: data.content[0].text });
  } catch { return res.status(500).json({ error: 'Something went wrong. Please try again.' }); }
}

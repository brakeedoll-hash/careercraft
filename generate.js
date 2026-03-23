// api/generate.js
// Vercel serverless function — listo para producción

export default async function handler(req, res) {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // ── Validación ──
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('❌ Missing GEMINI_API_KEY');
      return res.status(500).json({
        error: 'Server misconfiguration: GEMINI_API_KEY is missing.',
      });
    }

    // ── Llamada a Gemini ──
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    // ── Manejo de errores de Gemini ──
    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('❌ Gemini API error:', errText);

      return res.status(502).json({
        error: 'Gemini API failed. Check your API key or quota.',
      });
    }

    const data = await geminiRes.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response generated.';

    // ── Respuesta final ──
    return res.status(200).json({ result: text });

  } catch (err) {
    console.error('🔥 Handler crash:', err);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
} 

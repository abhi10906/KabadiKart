const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are KabadiBot, a helpful assistant for KabadiKart — a scrap pickup booking app in India.
      You help users with:
      - Scrap types we accept (Iron, Steel, Copper, Aluminium, Brass, Paper, Plastic, E-Waste, Glass etc.)
      - Approximate scrap prices in Indian Rupees per kg
      - How the pickup booking process works
      - Time slots and scheduling questions
      - General recycling and eco-friendly tips

      Keep answers short, friendly, and in simple English.
      If asked anything unrelated to scrap or KabadiKart, politely say you can only help with scrap-related queries.

      User asked: ${message}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'AI service failed. Try again.' });
  }
});

module.exports = router;
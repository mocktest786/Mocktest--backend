// backend/routes/get-typing-text.js

const express = require('express'); const router = express.Router(); const TypingText = require('../models/TypingText');

// 📥 GET /api/get-typing-text // 📌 Returns today's English typing test text router.get('/', async (req, res) => { try { const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD const typingText = await TypingText.findOne({ date: todayStr });

if (!typingText) {
  return res.status(404).json({ error: 'No typing text found for today' });
}

res.status(200).json(typingText);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


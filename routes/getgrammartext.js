// backend/routes/get-grammar-text.js

const express = require('express'); const router = express.Router(); const GrammarText = require('../models/GrammarText');

// 📥 GET /api/get-grammar-text // 📌 Returns today's grammar Hindi text router.get('/', async (req, res) => { try { const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD const grammarText = await GrammarText.findOne({ date: todayStr });

if (!grammarText) {
  return res.status(404).json({ error: 'No grammar text found for today' });
}

res.status(200).json(grammarText);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


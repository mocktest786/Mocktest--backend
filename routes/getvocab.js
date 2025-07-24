// backend/routes/get-vocab.js

const express = require('express'); const router = express.Router(); const Vocabulary = require('../models/Vocabulary');

// 📥 GET /api/get-vocab // 📌 Returns today's vocabulary and last 7 days router.get('/', async (req, res) => { try { const today = new Date(); const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(today.getDate() - 7);

const vocabList = await Vocabulary.find({
  date: { $gte: sevenDaysAgo, $lte: today }
}).sort({ date: -1 });

res.status(200).json(vocabList);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


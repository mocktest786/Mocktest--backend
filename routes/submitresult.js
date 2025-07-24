// backend/routes/submit-result.js

const express = require('express'); const router = express.Router(); const Result = require('../models/Result');

// 📤 POST /api/submit-result router.post('/', async (req, res) => { const { userId, paperId, score, answers } = req.body;

if (!userId || !paperId || score == null || !Array.isArray(answers)) { return res.status(400).json({ error: 'Missing required fields' }); }

try { await Result.create({ userId, paperId, score, answers, submittedAt: new Date(), });

res.json({ message: '✅ Result submitted successfully' });

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


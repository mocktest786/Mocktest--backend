// backend/routes/get-mocktest.js

const express = require('express'); const router = express.Router(); const MockTest = require('../models/MockTest'); const Question = require('../models/Question');

// 📤 GET /api/get-mocktest/:paperId router.get('/:paperId', async (req, res) => { const { paperId } = req.params;

if (!paperId) return res.status(400).json({ error: 'Paper ID is required' });

try { const test = await MockTest.findById(paperId); if (!test) return res.status(404).json({ error: 'Mock Test not found' });

const questions = await Question.find({ paperId }).sort({ qno: 1 });

res.json({
  test,
  questions,
});

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


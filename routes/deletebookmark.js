// backend/routes/delete-bookmark.js

const express = require('express'); const router = express.Router(); const Bookmark = require('../models/Bookmark');

// 🗑️ DELETE /api/delete-bookmark // 📌 { userId: "xyz", questionId: "abc" } router.delete('/', async (req, res) => { const { userId, questionId } = req.body;

if (!userId || !questionId) { return res.status(400).json({ error: 'userId and questionId are required' }); }

try { await Bookmark.deleteOne({ userId, questionId }); res.status(200).json({ message: '✅ Bookmark deleted' }); } catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


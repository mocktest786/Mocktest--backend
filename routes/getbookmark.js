// backend/routes/get-bookmarked.js

const express = require('express'); const router = express.Router(); const Bookmark = require('../models/Bookmark');

// 📥 GET /api/get-bookmarked?userId=xyz router.get('/', async (req, res) => { const { userId } = req.query;

if (!userId) { return res.status(400).json({ error: 'userId is required' }); }

try { const bookmarks = await Bookmark.find({ userId }); res.json({ bookmarks }); } catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


// backend/routes/get-editorials.js

const express = require('express'); const router = express.Router(); const Editorial = require('../models/Editorial');

// 📥 GET /api/get-editorials // 📌 Return latest editorial + last 7 days router.get('/', async (req, res) => { try { const today = new Date(); const sevenDaysAgo = new Date(today); sevenDaysAgo.setDate(today.getDate() - 7);

const editorials = await Editorial.find({
  date: { $gte: sevenDaysAgo, $lte: today }
}).sort({ date: -1 });

res.status(200).json(editorials);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


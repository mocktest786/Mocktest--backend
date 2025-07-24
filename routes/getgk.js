// backend/routes/get-gk.js

const express = require('express'); const router = express.Router(); const GK = require('../models/GK');

// 📥 GET /api/get-gk // 📌 Returns today's and last 7 days GK questions router.get('/', async (req, res) => { try { const today = new Date(); const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(today.getDate() - 7);

const gkData = await GK.find({
  date: { $gte: sevenDaysAgo, $lte: today }
}).sort({ date: -1 });

res.status(200).json(gkData);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


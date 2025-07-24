// backend/routes/get-maths.js

const express = require('express'); const router = express.Router(); const Maths = require('../models/Maths');

// 📥 GET /api/get-maths // 📌 Returns today's and last 7 days Maths questions router.get('/', async (req, res) => { try { const today = new Date(); const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(today.getDate() - 7);

const mathsData = await Maths.find({
  date: { $gte: sevenDaysAgo, $lte: today }
}).sort({ date: -1 });

res.status(200).json(mathsData);

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;


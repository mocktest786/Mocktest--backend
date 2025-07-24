const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

/**
 * 📤 GET /api/leaderboard
 * 🔎 Get top 10 mock test scorers sorted by score (descending)
 */
router.get("/leaderboard", async (req, res) => {
  try {
    const topScorers = await Result.find({})
      .sort({ score: -1 })   // Descending order
      .limit(10);

    res.status(200).json(topScorers);
  } catch (err) {
    console.error("❌ Leaderboard fetch error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
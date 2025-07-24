const express = require("express");
const router = express.Router();
const DailyGK = require("../models/DailyGK");

/**
 * 📥 POST /api/upload-gk
 * 📌 Admin uploads daily GK questions (date, questions[])
 */
router.post("/upload-gk", async (req, res) => {
  const { date, questions } = req.body;

  if (!date || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "❌ Provide date and GK questions array" });
  }

  try {
    const docId = `gk_${date}`;

    await DailyGK.findOneAndUpdate(
      { docId },
      {
        docId,
        date,
        questions,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Daily GK questions uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload GK Error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
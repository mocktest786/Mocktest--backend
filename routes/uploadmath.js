const express = require("express");
const router = express.Router();
const DailyMaths = require("../models/DailyMaths");

/**
 * 📥 POST /api/upload-maths
 * 📌 Admin uploads daily 50 maths questions (date, questions[])
 */
router.post("/upload-maths", async (req, res) => {
  const { date, questions } = req.body;

  if (!date || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "❌ Provide both date and valid questions array" });
  }

  try {
    const docId = `maths_${date}`;

    await DailyMaths.findOneAndUpdate(
      { docId },
      {
        docId,
        date,
        questions,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Daily Maths questions uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Vocabulary = require("../models/Vocabulary");

/**
 * 📥 POST /api/upload-vocabulary
 * 📌 Admin uploads daily vocabulary (date, words[])
 */
router.post("/upload-vocabulary", async (req, res) => {
  const { date, words } = req.body;

  if (!date || !Array.isArray(words) || words.length === 0) {
    return res.status(400).json({ error: "❌ Provide a date and at least one word" });
  }

  try {
    const docId = `vocab_${date}`;

    await Vocabulary.findOneAndUpdate(
      { docId },
      {
        docId,
        date,
        words, // Array of { word, meaning, example }
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Vocabulary uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
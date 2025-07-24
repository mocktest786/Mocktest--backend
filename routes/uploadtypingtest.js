const express = require("express");
const router = express.Router();
const TypingText = require("../models/TypingText");

/**
 * 📥 POST /api/upload-typing-text
 * 📌 Admin uploads daily English typing test text
 */
router.post("/upload-typing-text", async (req, res) => {
  const { date, text } = req.body;

  if (!date || !text) {
    return res.status(400).json({ error: "❌ Provide both date and typing text" });
  }

  try {
    const docId = `typing_${date}`;

    await TypingText.findOneAndUpdate(
      { docId },
      {
        docId,
        date,
        text,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Typing text uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
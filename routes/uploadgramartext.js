const express = require("express");
const router = express.Router();
const GrammarText = require("../models/GrammarText");

/**
 * 📥 POST /api/upload-grammar-text
 * 📌 Admin uploads daily Hindi grammar test text
 */
router.post("/upload-grammar-text", async (req, res) => {
  const { date, hindiText } = req.body;

  if (!date || !hindiText) {
    return res.status(400).json({ error: "❌ Provide both date and Hindi text" });
  }

  try {
    const docId = `grammar_${date}`;

    await GrammarText.findOneAndUpdate(
      { docId },
      {
        docId,
        date,
        hindiText,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Grammar Hindi text uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
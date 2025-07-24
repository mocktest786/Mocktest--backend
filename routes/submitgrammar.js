const express = require("express");
const router = express.Router();
const GrammarResult = require("../models/GrammarResult");

/**
 * 📥 POST /api/submit-grammar
 * 📝 Submit grammar analysis result
 */
router.post("/submit-grammar", async (req, res) => {
  const {
    userId,
    typedHindiText,
    detectedMistakes = [],
    correctEnglish,
    wordAnalysis = []
  } = req.body;

  if (!userId || !typedHindiText || !correctEnglish || !Array.isArray(wordAnalysis)) {
    return res.status(400).json({ error: "❌ Incomplete or invalid data" });
  }

  try {
    const grammarEntry = new GrammarResult({
      userId,
      typedHindiText,
      detectedMistakes,
      correctEnglish,
      wordAnalysis,
      timestamp: new Date()
    });

    await grammarEntry.save();
    res.status(200).json({ message: "✅ Grammar result submitted successfully" });
  } catch (err) {
    console.error("❌ Submit Grammar Error:", err.message);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
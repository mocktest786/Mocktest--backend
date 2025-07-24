const express = require("express");
const router = express.Router();
const TypingResult = require("../models/TypingResult");

/**
 * 📥 POST /api/submit-typing
 * 🧠 Submit typing result (speed, accuracy, typed text)
 */
router.post("/submit-typing", async (req, res) => {
  const { userId, typedText, speed, accuracy } = req.body;

  if (!userId || !typedText || speed == null || accuracy == null) {
    return res.status(400).json({ error: "❌ Missing required fields" });
  }

  try {
    const newTypingResult = new TypingResult({
      userId,
      typedText,
      speed,
      accuracy,
      timestamp: new Date()
    });

    await newTypingResult.save();
    res.status(200).json({ message: "✅ Typing result submitted successfully" });
  } catch (err) {
    console.error("❌ Typing result submission error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
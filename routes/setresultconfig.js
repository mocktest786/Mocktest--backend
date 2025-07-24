const express = require("express");
const router = express.Router();
const ResultConfig = require("../models/ResultConfig");

/**
 * 📥 POST /api/set-result-config
 * 📌 Admin sets marking config for a paper
 */
router.post("/set-result-config", async (req, res) => {
  const { paperId, marksPerCorrect, marksPerWrong, totalMarks, timeLimit } = req.body;

  // ✅ Input validation
  if (
    !paperId ||
    typeof marksPerCorrect !== "number" ||
    typeof marksPerWrong !== "number" ||
    typeof totalMarks !== "number" ||
    typeof timeLimit !== "number"
  ) {
    return res.status(400).json({ error: "❌ Missing or invalid required fields" });
  }

  try {
    const configData = {
      paperId,
      marksPerCorrect,
      marksPerWrong,
      totalMarks,
      timeLimit, // in minutes
      updatedAt: new Date()
    };

    // 🔄 Upsert logic: update if exists, else insert
    await ResultConfig.findOneAndUpdate(
      { paperId },
      configData,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Result config saved successfully" });
  } catch (err) {
    console.error("❌ Set config error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
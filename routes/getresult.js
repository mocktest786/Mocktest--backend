const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Test = require("../models/Test");

/**
 * 📤 POST /api/get-result
 * 📌 Get user's test result and corresponding test questions
 */
router.post("/get-result", async (req, res) => {
  try {
    const { userId, paper } = req.body;

    // 🔐 Input validation
    if (!userId || !paper) {
      return res.status(400).json({ error: "❌ userId and paper are required" });
    }

    if (typeof userId !== "string" || typeof paper !== "string") {
      return res.status(400).json({ error: "❌ userId and paper must be strings" });
    }

    // 📊 Find result for the user & paper
    const result = await Result.findOne({ userId, paper });

    if (!result) {
      return res.status(404).json({ error: "❌ No result found" });
    }

    // 📚 Find mock test for the paper
    const test = await Test.findOne({ paper });

    if (!test) {
      return res.status(404).json({ error: "❌ No mock test found" });
    }

    // ✅ Sort questions by qno (if not already sorted)
    const questions = test.questions.sort((a, b) => a.qno - b.qno);

    // ✅ Send response
    res.status(200).json({
      result,
      questions
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

module.exports = router;
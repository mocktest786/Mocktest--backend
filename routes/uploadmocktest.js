const express = require("express");
const router = express.Router();
const MockTest = require("../models/MockTest");

/**
 * 📥 POST /api/upload-mocktest
 * 🛡️ Admin uploads a mock test (subject, paper, questions[])
 */
router.post("/upload-mocktest", async (req, res) => {
  const { adminId, subject, paper, questions } = req.body;

  if (!adminId || !subject || !paper || !Array.isArray(questions)) {
    return res.status(400).json({ error: "❌ Incomplete data" });
  }

  try {
    const newTest = new MockTest({
      adminId,
      subject,
      paper,
      questions: questions.map((q, index) => ({
        qno: index + 1,
        questionText: q.questionText,
        options: q.options,          // { A, B, C, D }
        correct: q.correct,
        explanation: q.explanation || ""
      })),
      createdAt: new Date()
    });

    await newTest.save();
    res.status(200).json({ message: "✅ Mock test uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload Error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Editorial = require("../models/Editorial");

/**
 * 📥 POST /api/upload-editorial
 * 📌 Admin uploads editorial with title, content, date
 */
router.post("/upload-editorial", async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).json({ error: "❌ Please provide title, content, and date" });
  }

  try {
    const docId = `editorial_${date}`;

    await Editorial.findOneAndUpdate(
      { docId },
      {
        docId,
        title,
        content,
        date,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Editorial uploaded successfully" });
  } catch (err) {
    console.error("❌ Editorial upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
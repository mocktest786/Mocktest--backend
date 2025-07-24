const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

/**
 * 📥 POST /api/bookmark-question
 * ✅ Allows a user to bookmark a specific question
 */
router.post("/bookmark-question", async (req, res) => {
  const { userId, paperId, questionId } = req.body;

  if (!userId || !paperId || !questionId) {
    return res.status(400).json({ error: "❌ userId, paperId, and questionId are required" });
  }

  try {
    const bookmarkKey = `${userId}_${paperId}_${questionId}`;

    await Bookmark.findOneAndUpdate(
      { bookmarkKey },
      {
        bookmarkKey,
        userId,
        paperId,
        questionId,
        bookmarkedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "✅ Question bookmarked successfully" });
  } catch (err) {
    console.error("❌ Bookmark Error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
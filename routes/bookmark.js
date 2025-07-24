const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  bookmarkKey: { type: String, unique: true }, // Combination: userId_paperId_questionId
  userId: { type: String, required: true },
  paperId: { type: String, required: true },
  questionId: { type: String, required: true },
  bookmarkedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
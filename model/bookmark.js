// backend/models/Bookmark.js

const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({ userId: { type: String, required: true }, questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('Bookmark', bookmarkSchema);


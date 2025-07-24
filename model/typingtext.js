// backend/models/TypingText.js

const mongoose = require('mongoose');

const typingTextSchema = new mongoose.Schema({ date: { type: String, required: true }, // YYYY-MM-DD text: { type: String, required: true }, createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('TypingText', typingTextSchema);


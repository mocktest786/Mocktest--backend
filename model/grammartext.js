// backend/models/GrammarText.js

const mongoose = require('mongoose');

const grammarTextSchema = new mongoose.Schema({ date: { type: String, required: true }, // YYYY-MM-DD hindiText: { type: String, required: true }, createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('GrammarText', grammarTextSchema);


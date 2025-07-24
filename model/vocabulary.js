// backend/models/Vocabulary.js

const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({ date: { type: String, required: true }, // YYYY-MM-DD format words: [ { word: String, meaning: String, example: String, } ], createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('Vocabulary', vocabularySchema);


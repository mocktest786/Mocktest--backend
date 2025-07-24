// backend/models/GK.js

const mongoose = require('mongoose');

const gkSchema = new mongoose.Schema({ date: { type: String, required: true }, // YYYY-MM-DD questions: [ { questionText: String, options: { A: String, B: String, C: String, D: String, }, correct: String, explanation: String, } ], createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('GK', gkSchema);


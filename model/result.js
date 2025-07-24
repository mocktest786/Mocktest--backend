// backend/models/Result.js

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({ userId: { type: String, required: true }, paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest', required: true }, score: { type: Number, required: true }, answers: [ { qno: Number, selected: String, correct: String, }, ], submittedAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('Result', resultSchema);


// backend/models/Question.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({ paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest', required: true }, qno: { type: Number, required: true }, questionText: { type: String, required: true }, options: { A: String, B: String, C: String, D: String, }, correct: { type: String, required: true }, explanation: { type: String, default: '' }, });

module.exports = mongoose.model('Question', questionSchema);


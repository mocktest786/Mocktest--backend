// backend/models/Editorial.js

const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema({ title: { type: String, required: true }, content: { type: String, required: true }, date: { type: String, required: true }, // YYYY-MM-DD format createdAt: { type: Date, default: Date.now }, });

module.exports = mongoose.model('Editorial', editorialSchema);


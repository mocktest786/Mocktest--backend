const express = require('express');
const router = express.Router();
const TestModel = require('../models/Test');

// ➕ Route to upload a new test question
router.post('/upload', async (req, res) => {
  try {
    const { exam, paper, subject, question, options, correctAnswer, explanation } = req.body;

    if (!exam || !paper || !subject || !question || !options || !correctAnswer) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newTest = new TestModel({
      exam,
      paper,
      subject,
      question,
      options,
      correctAnswer,
      explanation
    });

    await newTest.save();
    res.json({ success: true, message: 'Test question uploaded successfully.' });
  } catch (err) {
    console.error("Error uploading test:", err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// 📄 Route to fetch all questions for a specific exam & paper
router.get('/get', async (req, res) => {
  try {
    const { exam, paper, subject } = req.query;

    let query = {};
    if (exam) query.exam = exam;
    if (paper) query.paper = paper;
    if (subject) query.subject = subject;

    const questions = await TestModel.find(query);
    res.json({ success: true, questions });
  } catch (err) {
    console.error("Error fetching tests:", err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const Test = require("../models/Test");
const Editorial = require("../models/Editorial");
const Vocabulary = require("../models/Vocabulary");

/**
 * 🎯 Upload Mock Test
 * 📌 POST /api/upload-mocktest
 */
router.post("/upload-mocktest", async (req, res) => {
  const { subject, paper, questions } = req.body;

  if (!subject || !paper || !Array.isArray(questions)) {
    return res.status(400).json({ error: "❌ subject, paper, and questions array are required" });
  }

  try {
    const newTest = new Test({
      subject,
      paper,
      questions,
      createdAt: new Date()
    });

    await newTest.save();
    res.status(200).json({ message: "✅ Mock test uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

/**
 * 📚 Upload Editorial
 * 📌 POST /api/upload-editorial
 */
router.post("/upload-editorial", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "❌ title and content are required" });
  }

  try {
    const newEditorial = new Editorial({
      title,
      content,
      timestamp: new Date()
    });

    await newEditorial.save();
    res.status(200).json({ message: "✅ Editorial uploaded successfully" });
  } catch (err) {
    console.error("❌ Editorial upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

/**
 * 📘 Upload Vocabulary
 * 📌 POST /api/upload-vocab
 */
router.post("/upload-vocab", async (req, res) => {
  const { word, meaning, example } = req.body;

  if (!word || !meaning || !example) {
    return res.status(400).json({ error: "❌ word, meaning, and example are required" });
  }

  try {
    const newVocab = new Vocabulary({
      word,
      meaning,
      example,
      timestamp: new Date()
    });

    await newVocab.save();
    res.status(200).json({ message: "✅ Vocabulary uploaded successfully" });
  } catch (err) {
    console.error("❌ Vocabulary upload error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Stop server if DB fails
});

// Routes
app.use('/api/getmocktest', require('./routes/getmocktest'));
app.use('/api/submitresult', require('./routes/submitresult'));
app.use('/api/getbookmarked', require('./routes/getbookmarked'));
app.use('/api/deletebookmark', require('./routes/deletebookmark'));
app.use('/api/geteditorials', require('./routes/geteditorials'));
app.use('/api/getvocab', require('./routes/getvocab'));
app.use('/api/getgk', require('./routes/getgk'));
app.use('/api/getmaths', require('./routes/getmaths'));
app.use('/api/getgrammartext', require('./routes/getgrammartext'));
app.use('/api/gettypingtext', require('./routes/gettypingtext'));

// Test route
app.get('/', (req, res) => {
  res.send('🎯 Backend is live!');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

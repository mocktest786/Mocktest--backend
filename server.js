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
app.use('/api/get-mocktest', require('./routes/get-mocktest'));
app.use('/api/submit-result', require('./routes/submit-result'));
app.use('/api/get-bookmarked', require('./routes/get-bookmarked'));
app.use('/api/delete-bookmark', require('./routes/delete-bookmark'));
app.use('/api/get-editorials', require('./routes/get-editorials'));
app.use('/api/get-vocab', require('./routes/get-vocab'));
app.use('/api/get-gk', require('./routes/get-gk'));
app.use('/api/get-maths', require('./routes/get-maths'));
app.use('/api/get-grammar-text', require('./routes/get-grammar-text'));
app.use('/api/get-typing-text', require('./routes/get-typing-text'));

// Test route
app.get('/', (req, res) => {
  res.send('🎯 Backend is live!');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

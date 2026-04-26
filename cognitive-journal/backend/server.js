const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entriesRouter = require('./routes/entries');

const app = express();

// Middleware
app.use(cors());                    // Allow requests from React frontend
app.use(express.json());            // Parse incoming JSON request bodies

// Routes
app.use('/api/entries', entriesRouter);

// Health check route — visit localhost:5000 to confirm server is running
app.get('/', (req, res) => {
  res.json({ message: 'Cognitive Journal API is running' });
});

// Connect to MongoDB, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

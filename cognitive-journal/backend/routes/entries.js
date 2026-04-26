const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const { analyzeEmotions } = require('../services/huggingface');
const { mapDistortions } = require('../services/distortions');

// POST /api/entries — Submit a new journal entry
router.post('/', async (req, res) => {
  const { text } = req.body;

  // Basic validation
  if (!text || text.trim().length < 10) {
    return res.status(400).json({
      error: 'Journal entry must be at least 10 characters long',
    });
  }

  try {
    // Step 1: Send text to Hugging Face, get back emotion scores
    const emotions = await analyzeEmotions(text);

    // Step 2: Map emotions to cognitive distortions
    const distortions = mapDistortions(emotions);

    // Step 3: The top emotion (already sorted by score) is the dominant one
    const dominantEmotion = emotions[0]?.label || 'neutral';

    // Step 4: Save everything to MongoDB
    const entry = new Entry({
      text,
      emotions,
      distortions,
      dominantEmotion,
    });

    const savedEntry = await entry.save();

    // Step 5: Send the full analysis back to the frontend
    res.status(201).json(savedEntry);

  } catch (error) {
    console.error('Error processing entry:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/entries — Retrieve all past journal entries
router.get('/', async (req, res) => {
  try {
    // Sort by newest first
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// GET /api/entries/:id — Get a single entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// DELETE /api/entries/:id — Delete an entry
router.delete('/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;

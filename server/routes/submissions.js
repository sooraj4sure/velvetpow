const router = require('express').Router();
const Submission = require('../models/Submission');

// Save questionnaire response
router.post('/', async (req, res) => {
  try {
    const doc = await Submission.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all submissions (admin use)
router.get('/', async (req, res) => {
  const data = await Submission.find().sort({ submittedAt: -1 });
  res.json(data);
});

module.exports = router;
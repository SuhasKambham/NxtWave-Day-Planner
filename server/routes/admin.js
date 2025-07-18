const express = require('express');
const User = require('../models/User');
const Plan = require('../models/Plan');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Search employees by name or email
router.get('/search', authMiddleware, requireRole('manager'), async (req, res) => {
  const q = req.query.q || '';
  try {
    const users = await User.find({
      role: 'employee',
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a user's plan by date
router.get('/:userId/:date', authMiddleware, requireRole('manager'), async (req, res) => {
  const { userId, date } = req.params;
  try {
    const plan = await Plan.findOne({ userId, date });
    res.json(plan || { entries: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
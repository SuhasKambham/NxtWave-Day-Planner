const express = require('express');
const Plan = require('../models/Plan');
const { authMiddleware } = require('../middleware/authMiddleware');
const moment = require('moment');

const router = express.Router();

// Get today's plan for logged-in user
router.get('/today', authMiddleware, async (req, res) => {
  const today = moment().format('YYYY-MM-DD');
  try {
    const plan = await Plan.findOne({ userId: req.user._id, date: today });
    res.json(plan || { entries: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit/update today's plan
router.post('/today', authMiddleware, async (req, res) => {
  const today = moment().format('YYYY-MM-DD');
  const { entries } = req.body;
  try {
    let plan = await Plan.findOne({ userId: req.user._id, date: today });
    if (plan) {
      plan.entries = entries;
      await plan.save();
    } else {
      plan = new Plan({ userId: req.user._id, date: today, entries });
      await plan.save();
    }
    res.json({ message: 'Plan saved', plan });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get yesterday's plan for reminder
router.get('/yesterday', authMiddleware, async (req, res) => {
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  try {
    const plan = await Plan.findOne({ userId: req.user._id, date: yesterday });
    res.json(plan || { entries: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
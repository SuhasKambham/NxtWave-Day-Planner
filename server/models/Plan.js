const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  topic: { type: String, required: true },
  status: { type: String, enum: ['Yet to Start', 'In Progress', 'Done'], default: 'Yet to Start' },
  learningDate: { type: Date, required: true },
  duration: [{ type: String, required: true }], // e.g., ["09:00–10:00"]
  willCompleteBy: { type: Date },
  remarks: { type: String }
});

const planSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  entries: [entrySchema]
});

module.exports = mongoose.model('Plan', planSchema); 
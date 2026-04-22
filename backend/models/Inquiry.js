const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'new', enum: ['new', 'contacted', 'resolved'] }
});

module.exports = mongoose.model('Inquiry', inquirySchema);

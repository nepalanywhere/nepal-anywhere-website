const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: String
});

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending Pickup', 'In Transit', 'Delivered'], default: 'Pending Pickup' },
  currentLocation: String,
  pickupDate: String,
  estimatedDelivery: String,
  stages: [stageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);

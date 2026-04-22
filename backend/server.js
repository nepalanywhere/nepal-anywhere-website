const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const connectDB = require('./db');
const Shipment = require('./models/Shipment');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../'));

// Track API
app.post('/api/track', async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    const shipment = await Shipment.findOne({ trackingNumber });
    
    if (!shipment) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact API
app.post('/api/contact', async (req, res) => {
  try {
    const inquiry = {
      name: req.body.name,
      email: req.body.email,
      service: req.body.service,
      message: req.body.message
    };
    
    const newInquiry = await Inquiry.create(inquiry);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Admin Dashboard APIs
app.get('/api/admin/shipments', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ status: 'new' }).sort({ timestamp: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/inquiries', async (req, res) => {
  try {
    await Inquiry.deleteMany({});
    res.json({ success: true, message: 'All inquiries cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new Shipment
app.post('/api/admin/shipments', async (req, res) => {
  try {
    const { trackingNumber, status, currentLocation, pickupDate, estimatedDelivery } = req.body;
    
    if (!trackingNumber) {
      return res.status(400).json({ error: 'Tracking number is required' });
    }

    const newShipment = await Shipment.create({
      trackingNumber,
      status: status || 'Pending Pickup',
      currentLocation: currentLocation || '',
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      estimatedDelivery: estimatedDelivery || '',
      stages: []
    });

    res.json({ success: true, shipment: newShipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Shipment (when parcel arrives)
app.put('/api/admin/shipments/:id', async (req, res) => {
  try {
    const { status, currentLocation, estimatedDelivery, stages } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { status, currentLocation, estimatedDelivery, stages },
      { new: true }
    );
    res.json({ success: true, shipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Shipment
app.delete('/api/admin/shipments/:id', async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Shipment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Dashboard route
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Main site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// No migration - JSON folder deleted, only new data

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin.html`);
});


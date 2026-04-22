require('dotenv').config();
const connectDB = require('./db');
const Shipment = require('./models/Shipment');

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    
    await Shipment.deleteMany({});
    console.log('Cleared existing shipments');
    
    const samples = [
      {
        trackingNumber: 'HC-20250101',
        status: 'Delivered',
        currentLocation: 'New York, USA',
        pickupDate: '2025-01-01',
        estimatedDelivery: '2025-01-05',
        stages: [
          {name: 'Picked up', status: 'completed', date: '2025-01-01'},
          {name: 'In Transit', status: 'completed', date: '2025-01-03'},
          {name: 'Delivered', status: 'completed', date: '2025-01-05'}
        ]
      },
      {
        trackingNumber: 'HC-20250102',
        status: 'In Transit',
        currentLocation: 'Dubai Airport',
        pickupDate: '2025-01-06',
        estimatedDelivery: '2025-01-10',
        stages: [
          {name: 'Picked up', status: 'completed', date: '2025-01-06'},
          {name: 'In Transit', status: 'current', date: '2025-01-07'}
        ]
      },
      {
        trackingNumber: 'HC-20250103',
        status: 'Pending Pickup',
        currentLocation: 'Sender Address, Pokhara',
        pickupDate: null,
        estimatedDelivery: '2025-01-12',
        stages: [{name: 'Pending Pickup', status: 'current'}]
      },
      {
        trackingNumber: 'HC-20250104',
        status: 'Delivered',
        currentLocation: 'London, UK',
        pickupDate: '2025-01-02',
        estimatedDelivery: '2025-01-08',
        stages: [
          {name: 'Picked up', status: 'completed', date: '2025-01-02'},
          {name: 'In Transit', status: 'completed', date: '2025-01-05'},
          {name: 'Delivered', status: 'completed', date: '2025-01-08'}
        ]
      },
      {
        trackingNumber: 'HC-20250105',
        status: 'In Transit',
        currentLocation: 'Qatar Airways Hub, Doha',
        pickupDate: '2025-01-07',
        estimatedDelivery: '2025-01-11',
        stages: [
          {name: 'Picked up', status: 'completed', date: '2025-01-07'},
          {name: 'In Transit', status: 'current', date: '2025-01-08'}
        ]
      }
    ];

    const inserted = await Shipment.insertMany(samples);
    console.log(`✅ Added ${inserted.length} sample shipments`);
    
    const count = await Shipment.countDocuments();
    console.log(`Total shipments now: ${count}`);
    
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  } finally {
    process.exit(0);
  }
}

seed();


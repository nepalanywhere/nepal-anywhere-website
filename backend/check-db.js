const connectDB = require('./db');
const Shipment = require('./models/Shipment');
const Inquiry = require('./models/Inquiry');

async function checkDB() {
  try {
    await connectDB();
    const shipmentsCount = await Shipment.countDocuments();
    const inquiriesCount = await Inquiry.countDocuments();
    console.log(`Shipments: ${shipmentsCount}`);
    console.log(`Inquiries: ${inquiriesCount}`);
    console.log('✅ DB check complete');
  } catch (error) {
    console.error('DB Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkDB();


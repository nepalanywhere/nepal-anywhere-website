const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
const conn = await mongoose.connect('mongodb://localhost:27017/nepalanywhere');
console.log(`MongoDB Compass Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

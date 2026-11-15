'use strict';

const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      // Modern Mongoose 8.x — no deprecated options needed
    });

    console.log(`[DB] MongoDB connected: ${conn.connection.host} (${conn.connection.name})`);

    mongoose.connection.on('disconnected', () => {
      console.warn('[DB] MongoDB disconnected. Reconnecting...');
    });

    mongoose.connection.on('error', (err) => {
      console.error('[DB] MongoDB connection error:', err.message);
    });

  } catch (error) {
    console.error('[DB] Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

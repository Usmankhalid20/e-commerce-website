'use strict';

const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');
const seedSuperAdmin = require('./utils/seedSuperAdmin');

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (err) => {
  console.error('[SERVER] Uncaught Exception. Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Seed Super Admin Account
    await seedSuperAdmin();

    // 3. Start Express Server
    const server = app.listen(config.PORT, () => {
      console.log(`[SERVER] Running on port ${config.PORT} in ${config.NODE_ENV} mode.`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('[SERVER] Unhandled Rejection. Shutting down...');
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown on SIGTERM (e.g., from Heroku/Docker)
    process.on('SIGTERM', () => {
      console.log('[SERVER] SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('[SERVER] Process terminated.');
      });
    });

  } catch (error) {
    console.error('[SERVER] Failed to start server:', error);
    process.exit(1);
  }
};

module.exports = { startServer };

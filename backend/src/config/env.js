'use strict';

const REQUIRED_VARS = ['CONNECTION', 'JWT_SECRET'];

REQUIRED_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`[CONFIG] FATAL: Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGO_URI: process.env.CONNECTION,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5174').split(','),
  isProduction: process.env.NODE_ENV === 'production',
  SUPERADMIN_NAME: process.env.SUPERADMIN_NAME || 'Super Admin',
  SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL || 'admin@onedrop.com',
  SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD || 'SuperAdminPass123!',
};

module.exports = config;

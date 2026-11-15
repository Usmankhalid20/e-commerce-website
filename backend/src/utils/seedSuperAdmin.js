'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const config = require('../config/env');

const SALT_ROUNDS = 12;

/**
 * Seeds the initial Super Admin account if one does not already exist.
 * Idempotent: checks database by role and email before creation.
 */
const seedSuperAdmin = async () => {
  try {
    const superAdminEmail = config.SUPERADMIN_EMAIL.toLowerCase().trim();

    // Check if superadmin user exists by role or email
    const existingSuperAdmin = await User.findOne({
      $or: [
        { role: 'superadmin' },
        { email: superAdminEmail }
      ]
    });

    if (existingSuperAdmin) {
      // If user exists with email but role is not superadmin, ensure role is updated to superadmin
      if (existingSuperAdmin.role !== 'superadmin') {
        existingSuperAdmin.role = 'superadmin';
        await existingSuperAdmin.save();
        console.log(`[SEED] Updated user role to superadmin for: ${existingSuperAdmin.email}`);
      } else {
        console.log(`[SEED] Super Admin account already exists: ${existingSuperAdmin.email}`);
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(config.SUPERADMIN_PASSWORD, SALT_ROUNDS);

    await User.create({
      fullName: config.SUPERADMIN_NAME || 'Super Admin',
      email: superAdminEmail,
      password: hashedPassword,
      role: 'superadmin',
    });

    console.log(`[SEED] Super Admin account created successfully!`);
    console.log(`[SEED] Email: ${superAdminEmail}`);
  } catch (error) {
    console.error('[SEED] Failed to seed Super Admin account:', error.message);
  }
};

module.exports = seedSuperAdmin;

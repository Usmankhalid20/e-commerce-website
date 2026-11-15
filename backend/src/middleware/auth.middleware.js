'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/user.model');

/**
 * Middleware to protect routes — verifies the JWT from cookie or Authorization header.
 */
const protectRoute = async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
  }

  const user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Account not found.' });
  }

  req.user = user;
  next();
};

/**
 * Middleware to restrict access to admin & superadmin routes.
 * Must be used AFTER protectRoute.
 */
const adminOnly = (req, res, next) => {
  if (!['admin', 'superadmin'].includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin or Super Admin privileges required.',
    });
  }
  next();
};

/**
 * Middleware to restrict access to superadmin-only routes.
 * Must be used AFTER protectRoute.
 */
const superAdminOnly = (req, res, next) => {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privileges required.',
    });
  }
  next();
};

module.exports = { protectRoute, adminOnly, superAdminOnly };

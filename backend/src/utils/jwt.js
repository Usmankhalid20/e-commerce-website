'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Signs a JWT and attaches it to the response as an httpOnly cookie.
 * @param {string} userId - The MongoDB user _id
 * @param {import('express').Response} res - Express response object
 * @returns {string} The signed JWT string
 */
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    httpOnly: true,                           // Not accessible via JS
    secure: config.isProduction,              // HTTPS only in production
    sameSite: config.isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,        // 7 days in ms
  });

  return token;
};

module.exports = { generateTokenAndSetCookie };

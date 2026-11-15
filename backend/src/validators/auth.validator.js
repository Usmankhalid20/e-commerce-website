'use strict';

const validateSignUp = (req) => {
  const errors = [];
  const { fullName, email, password } = req.body;

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('Full name is required');
  } else if (fullName.trim().length > 100) {
    errors.push('Full name cannot exceed 100 characters');
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('Please provide a valid email address');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};

const validateLogin = (req) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  return errors;
};

module.exports = { validateSignUp, validateLogin };

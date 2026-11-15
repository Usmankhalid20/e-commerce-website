'use strict';

const authService = require('../services/auth.service');
const { generateTokenAndSetCookie } = require('../utils/jwt');

const signUp = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authService.authenticateUser(req.body);
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

const checkAuth = (req, res) => {
  return res.status(200).json({ success: true, data: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updatedUser = await authService.updateUserProfile(userId, req.body, req.file);
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await authService.getUsers(req.query);
    return res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login, logout, checkAuth, updateProfile, getUsers };

'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const SALT_ROUNDS = 12;

class AuthService {
  async registerUser({ fullName, email, password }) {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      const error = new Error('An account with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'user', // Public signup forces 'user'
    });

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    };
  }

  async authenticateUser({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      bio: user.bio,
    };
  }

  async updateUserProfile(userId, updateData, file) {
    const safeData = {};
    if (updateData.fullName) safeData.fullName = updateData.fullName.trim();
    if (updateData.email) safeData.email = updateData.email.toLowerCase().trim();
    if (updateData.bio !== undefined) safeData.bio = updateData.bio.trim();

    if (safeData.email) {
      const emailTaken = await User.findOne({ email: safeData.email, _id: { $ne: userId } });
      if (emailTaken) {
        const error = new Error('This email is already in use by another account.');
        error.statusCode = 409;
        throw error;
      }
    }

    if (file) {
      safeData.profilePic = `/uploads/profiles/${file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, safeData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    return updatedUser;
  }

  async getUsers({ page = 1, limit = 50 }) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({})
        .select('fullName email role profilePic createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = new AuthService();

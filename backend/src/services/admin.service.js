'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

const SALT_ROUNDS = 12;

class AdminService {
  async getDashboardAnalytics() {
    const [totalProducts, totalUsers, totalOrders, stockAggregation, revenueAggregation, recentOrders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.countDocuments(),
      Product.aggregate([{ $group: { _id: null, totalStock: { $sum: '$inStock' } } }]),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
      ]),
      Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'fullName email'),
    ]);

    const totalStock = stockAggregation[0]?.totalStock || 0;
    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    return {
      totalProducts,
      totalUsers,
      totalOrders,
      totalStock,
      totalRevenue,
      recentOrders,
    };
  }

  async createAdminAccount({ fullName, email, password }) {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      const error = new Error('An account with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const adminUser = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'admin',
    });

    return {
      _id: adminUser._id,
      fullName: adminUser.fullName,
      email: adminUser.email,
      role: adminUser.role,
      createdAt: adminUser.createdAt,
    };
  }
}

module.exports = new AdminService();

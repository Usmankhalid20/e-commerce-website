'use strict';

const Order = require('../models/order.model');
const Product = require('../models/product.model');

const SHIPPING_THRESHOLD = 10000;
const SHIPPING_COST = 200;

class OrderService {
  async createOrder(userId, { items, shippingInfo, paymentMethod }) {
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      const error = new Error('One or more products were not found.');
      error.statusCode = 400;
      throw error;
    }

    const orderItems = [];
    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId.toString());
      const quantity = Number(item.quantity);

      if (!product) {
        const error = new Error(`Product not found: ${item.productId}`);
        error.statusCode = 400;
        throw error;
      }

      if (product.inStock < quantity) {
        const error = new Error(`Insufficient stock for "${product.title}". Available: ${product.inStock}, requested: ${quantity}.`);
        error.statusCode = 400;
        throw error;
      }

      // Deduct stock
      product.inStock -= quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
      });
    }

    const subtotal = orderItems.reduce((acc, i) => acc + i.subtotal, 0);
    const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;

    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingInfo: {
        fullName: shippingInfo.fullName.trim(),
        email: shippingInfo.email.toLowerCase().trim(),
        phone: shippingInfo.phone.trim(),
        address: shippingInfo.address.trim(),
        city: shippingInfo.city.trim(),
        postalCode: shippingInfo.postalCode.trim(),
        country: shippingInfo.country.trim(),
      },
      paymentMethod: paymentMethod || 'cod',
      subtotal,
      shippingCost,
      total,
    });

    return order;
  }

  async getUserOrders(userId, { page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments({ user: userId }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getAllOrders({ page = 1, limit = 20, status }) {
    const skip = (page - 1) * limit;
    const filter = {};
    if (status && status !== 'all') {
      filter.orderStatus = status;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'fullName email'),
      Order.countDocuments(filter),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateOrderStatus(orderId, orderStatus) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    return order;
  }
}

module.exports = new OrderService();

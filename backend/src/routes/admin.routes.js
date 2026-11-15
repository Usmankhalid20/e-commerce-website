'use strict';

const { Router } = require('express');
const {
  getDashboardStats,
  createAdmin,
  listProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/admin.controller');
const { getAllOrders, updateOrderStatus } = require('../controllers/order.controller');
const { protectRoute, adminOnly, superAdminOnly } = require('../middleware/auth.middleware');
const { validate } = require('../validators/validator.middleware');
const { validateProductCreate } = require('../validators/product.validator');
const { validateSignUp } = require('../validators/auth.validator');
const upload = require('../middleware/upload.middleware');

const router = Router();

// Super Admin only routes
router.post('/create-admin', protectRoute, superAdminOnly, validate(validateSignUp), createAdmin);

// Admin & Super Admin routes
router.get('/dashboard', protectRoute, adminOnly, getDashboardStats);
router.post('/listing', protectRoute, adminOnly, upload.single('productImage'), validate(validateProductCreate), listProduct);
router.get('/products', protectRoute, adminOnly, getAllProducts);
router.put('/products/:id', protectRoute, adminOnly, upload.single('productImage'), updateProduct);
router.delete('/products/:id', protectRoute, adminOnly, deleteProduct);

// Admin Order routes
router.get('/orders', protectRoute, adminOnly, getAllOrders);
router.put('/orders/:id/status', protectRoute, adminOnly, updateOrderStatus);

module.exports = router;

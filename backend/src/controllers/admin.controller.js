'use strict';

const adminService = require('../services/admin.service');
const productService = require('../services/product.service');

const getDashboardStats = async (req, res, next) => {
  try {
    const analytics = await adminService.getDashboardAnalytics();
    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const adminUser = await adminService.createAdminAccount(req.body);
    return res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      data: adminUser,
    });
  } catch (error) {
    next(error);
  }
};

const listProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body, req.file, `${req.protocol}://${req.get('host')}`);
    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getProducts(req.query);
    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.file,
      `${req.protocol}://${req.get('host')}`
    );
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  createAdmin,
  listProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

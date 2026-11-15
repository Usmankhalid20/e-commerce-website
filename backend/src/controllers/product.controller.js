'use strict';

const productService = require('../services/product.service');

const getProducts = async (req, res, next) => {
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

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById };

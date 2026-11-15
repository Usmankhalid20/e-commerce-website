'use strict';

const { Router } = require('express');
const { getProducts, getProductById } = require('../controllers/product.controller');

const router = Router();

// Public routes for products — no authentication required to browse or view details
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;

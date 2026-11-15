'use strict';

const { Router } = require('express');
const { createOrder, getMyOrders } = require('../controllers/order.controller');
const { protectRoute } = require('../middleware/auth.middleware');
const { validate } = require('../validators/validator.middleware');
const { validateOrderCreate } = require('../validators/order.validator');

const router = Router();

router.use(protectRoute);

router.post('/', validate(validateOrderCreate), createOrder);
router.get('/', getMyOrders);

module.exports = router;

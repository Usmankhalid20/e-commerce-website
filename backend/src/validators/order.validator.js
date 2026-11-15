'use strict';

const validateOrderCreate = (req) => {
  const errors = [];
  const { items, shippingInfo } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('Order must contain at least one item');
    return errors;
  }

  for (const item of items) {
    if (!item.productId) {
      errors.push('Each order item must specify a valid productId');
      break;
    }
    const qty = Number(item.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 1000) {
      errors.push(`Invalid quantity for item ${item.productId}`);
      break;
    }
  }

  if (!shippingInfo || typeof shippingInfo !== 'object') {
    errors.push('Shipping information is required');
    return errors;
  }

  const requiredShipping = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
  for (const field of requiredShipping) {
    if (!shippingInfo[field] || typeof shippingInfo[field] !== 'string' || !shippingInfo[field].trim()) {
      errors.push(`Shipping field "${field}" is required`);
      break;
    }
  }

  return errors;
};

module.exports = { validateOrderCreate };

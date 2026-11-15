const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe('Server-Side Price Calculation Logic', () => {
  it('should correctly calculate subtotal from items and prices', () => {
    const items = [
      { price: 25.0, quantity: 2 },
      { price: 15.5, quantity: 1 }
    ];

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    assert.equal(subtotal, 65.5);
  });

  it('should apply free shipping when subtotal exceeds threshold', () => {
    const FREE_SHIPPING_THRESHOLD = 50;
    const STANDARD_SHIPPING = 5.99;

    const calculateShipping = (subtotal) =>
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

    assert.equal(calculateShipping(65.5), 0);
    assert.equal(calculateShipping(35.0), 5.99);
  });

  it('should reject invalid or negative quantities', () => {
    const validateItem = (item) => {
      if (!item.quantity || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        throw new Error('Invalid quantity');
      }
      return true;
    };

    assert.ok(validateItem({ price: 10, quantity: 3 }));
    assert.throws(() => validateItem({ price: 10, quantity: -1 }), /Invalid quantity/);
    assert.throws(() => validateItem({ price: 10, quantity: 0 }), /Invalid quantity/);
  });
});

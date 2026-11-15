const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { ROLES, ALL_ROLES } = require('../src/constants/roles.js');
const { CATEGORIES } = require('../src/constants/categories.js');
const { ORDER_STATUS, ALL_ORDER_STATUSES } = require('../src/constants/orderStatus.js');

describe('Domain Constants Verification', () => {
  it('should define valid roles hierarchy', () => {
    assert.equal(ROLES.USER, 'user');
    assert.equal(ROLES.ADMIN, 'admin');
    assert.equal(ROLES.SUPERADMIN, 'superadmin');
    assert.ok(ALL_ROLES.includes('user'));
    assert.ok(ALL_ROLES.includes('admin'));
  });

  it('should define product catalog categories', () => {
    assert.ok(Array.isArray(CATEGORIES));
    assert.ok(CATEGORIES.includes('cleanser'));
    assert.ok(CATEGORIES.includes('serum'));
    assert.ok(CATEGORIES.includes('moisturizer'));
  });

  it('should define order lifecycle statuses', () => {
    assert.ok(ALL_ORDER_STATUSES.includes('pending'));
    assert.ok(ALL_ORDER_STATUSES.includes('delivered'));
    assert.ok(ALL_ORDER_STATUSES.includes('cancelled'));
    assert.equal(ORDER_STATUS.PENDING, 'pending');
  });
});

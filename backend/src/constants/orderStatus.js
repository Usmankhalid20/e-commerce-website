'use strict';

const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

const ALL_ORDER_STATUSES = Object.values(ORDER_STATUS);

module.exports = { ORDER_STATUS, ALL_ORDER_STATUSES };

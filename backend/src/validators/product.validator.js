'use strict';

const validateProductCreate = (req) => {
  const errors = [];
  const { title, description, price, mrp, category, inStock } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Product title is required');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Product description is required');
  }

  if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
    errors.push('Valid price is required');
  }

  if (mrp === undefined || isNaN(Number(mrp)) || Number(mrp) < 0) {
    errors.push('Valid MRP is required');
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.push('Product category is required');
  }

  if (inStock === undefined || isNaN(Number(inStock)) || Number(inStock) < 0) {
    errors.push('Valid in-stock quantity is required');
  }

  if (!req.file && !req.body.image) {
    errors.push('Product image is required');
  }

  return errors;
};

module.exports = { validateProductCreate };

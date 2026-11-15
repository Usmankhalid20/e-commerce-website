'use strict';

const Product = require('../models/product.model');

class ProductService {
  async getProducts(query = {}) {
    const ALLOWED_SORTS = ['-createdAt', 'createdAt', 'price', '-price', 'title', '-title', '-inStock', 'inStock'];
    const requestedSort = query.sort || '-createdAt';
    const sort = ALLOWED_SORTS.includes(requestedSort) ? requestedSort : '-createdAt';

    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.category && query.category !== 'all') {
      filter.category = query.category.toLowerCase().trim();
    }

    if (query.search) {
      const searchTerm = query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (query.inStockOnly === 'true') {
      filter.inStock = { $gt: 0 };
    }

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async createProduct(productData, file, reqHost) {
    const imageUrl = file
      ? `${reqHost ? reqHost : ''}/uploads/products/${file.filename}`
      : productData.image || '';

    const product = await Product.create({
      title: productData.title.trim(),
      description: productData.description.trim(),
      price: Number(productData.price),
      mrp: Number(productData.mrp),
      discount: Number(productData.discount) || 0,
      category: productData.category.toLowerCase().trim(),
      inStock: Number(productData.inStock),
      image: imageUrl,
    });

    return product;
  }

  async updateProduct(id, updateData, file, reqHost) {
    const safeData = {};
    if (updateData.title !== undefined) safeData.title = updateData.title.trim();
    if (updateData.description !== undefined) safeData.description = updateData.description.trim();
    if (updateData.price !== undefined) safeData.price = Number(updateData.price);
    if (updateData.mrp !== undefined) safeData.mrp = Number(updateData.mrp);
    if (updateData.discount !== undefined) safeData.discount = Number(updateData.discount);
    if (updateData.category !== undefined) safeData.category = updateData.category.toLowerCase().trim();
    if (updateData.inStock !== undefined) safeData.inStock = Number(updateData.inStock);

    if (file) {
      safeData.image = `${reqHost ? reqHost : ''}/uploads/products/${file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, safeData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }
}

module.exports = new ProductService();

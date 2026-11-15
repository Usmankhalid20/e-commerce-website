import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      // Use the public /api/products endpoint — no auth required for browsing
      const res = await axiosInstance.get('/products', { params });
      // Backend returns { success, data, pagination }
      const products = res.data?.data ?? (Array.isArray(res.data) ? res.data : []);
      set({ products });
    } catch (error) {
      const msg = error.response?.data?.message || 'Error fetching products';
      set({ error: msg });
      toast.error('Error fetching products');
    } finally {
      set({ isLoading: false });
    }
  },

  getProductById: (id) => {
    const { products } = get();
    return products.find(
      (p) => p._id?.toString() === id?.toString() || p.id?.toString() === id?.toString()
    );
  },
}));

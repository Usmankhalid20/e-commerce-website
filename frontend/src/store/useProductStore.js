import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/admin/products");
      const products = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      set({ products });
    } catch (error) {
      console.log("Error in fetching products:", error);
      set({ error: error.response?.data?.message || "Error fetching products" });
      toast.error("Error fetching products");
    } finally {
      set({ isLoading: false });
    }
  },

  getProductById: (id) => {
    const { products } = get();
    return products.find((product) => product._id?.toString() === id?.toString() || product.id?.toString() === id?.toString());
  },
}));

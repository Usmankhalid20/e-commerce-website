import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          // Normalize ID — MongoDB uses _id; fallback to id for compatibility
          const productId = product._id || product.id;
          const existingItem = state.cart.find(
            (item) => (item._id || item.id) === productId
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                (item._id || item.id) === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          // Use _id or id consistently
          cart: state.cart.filter((item) => (item._id || item.id) !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            (item._id || item.id) === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'onedrop-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

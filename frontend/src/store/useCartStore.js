import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      quantity: 1,

      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item._id === product._id || item.id === product.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id || item.id === product.id
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
          cart: state.cart.filter((item) => item._id !== id && item.id !== id),
        })),

      increment: (inStock) =>
        set((state) => ({
          quantity: state.quantity < inStock ? state.quantity + 1 : state.quantity,
        })),

      decrement: () =>
        set((state) => ({
          quantity: state.quantity > 1 ? state.quantity - 1 : 1,
        })),

      setQuantity: (qty) => set({ quantity: qty }),

      resetQuantity: () => set({ quantity: 1 }),
    }),
    {
      name: "onedrop-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

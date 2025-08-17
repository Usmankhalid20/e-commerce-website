import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuth = create((set) => ({
  authUser: null,
  users: [],
  isSigningUp: false,
  isSigninIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  cart: [],
  quantity: 1,
  role: null,
  

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ 
        authUser: res.data,
        role: res.data?.role
       });
    } catch (error) {
      console.log("Error is checkAuth:", error);
      set({ 
        authUser: null,
        role: null
       });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res, "signup");
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
       console.log("Error is checkAuth:", error);
      toast.error("Error is checkAuth:");
    } finally {
      set({ isSigningUp: false });
    }
  },
  Login: async (data) => {
    set({ isSigninIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      console.log(res, "login");
      set({ 
        authUser: res.data,
        role: res.data
      });
      toast.success("Logged in Successfully");
    } catch (error) {
      set({
        authUser: null,
        role: null
      });
      console.log("error in Login:", error)
      toast.error("Error in Login");
    } finally {
      set({ isSigninIn: false });
    }
  },
  // getUsers: async() => {
  //   set({ isCheckingAuth: true });
  //   try {
  //     const res = await axiosInstance.get("auth/getusers");
  //     // set({users: res.data});
  //     return res.data;
  //     console.log("Users fetched successfully:", res.data);
  //     toast.success("Users fetched successfully");

  //   } catch (error) {
  //     console.log("Error in getUsers:", error);
  //     toast.error("Error fetching users");
  //   }
  //   finally {
  //     set({ isCheckingAuth: false });
  //   }
  // },

  Logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log(res, "logout");
      set({ authUser: null, role: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      console.log("Error in Logout:", error);
      toast.error("Error in Logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        // update quantity if already exists
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      // if new item
      return {
        cart: [...state.cart, { ...product, quantity }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
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



}));

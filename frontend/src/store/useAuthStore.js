import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const getUserFromResponse = (payload) =>
  payload?.data?.user ?? payload?.data ?? payload?.user ?? payload ?? null;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  role: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isSigninIn: false,
  isLoggingOut: false,
  error: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const user = getUserFromResponse(res.data);
      set({ 
        authUser: user,
        role: user?.role
      });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, role: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      const user = getUserFromResponse(res.data);
      set({ authUser: user, role: user?.role });
      toast.success("Account Created Successfully");
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error in Signup";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return null;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isSigninIn: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = getUserFromResponse(res.data);
      set({ authUser: user, role: user?.role });
      toast.success("Logged in Successfully");
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error in Login";
      set({ authUser: null, role: null, error: errorMessage });
      toast.error(errorMessage);
      return null;
    } finally {
      set({ isSigninIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, role: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      console.log("Error in Logout:", error);
      toast.error("Error in Logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (updateUser) => {
    try {
      const userId = get().authUser?._id;
      if (!userId) return;
      const res = await axiosInstance.put(`/auth/updateProfile/${userId}`, updateUser);
      const user = getUserFromResponse(res.data);
      set({ authUser: user, role: user?.role ?? get().role });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  },
}));

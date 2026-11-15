import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  role: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isSigningIn: false,
  isLoggingOut: false,
  error: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      const user = res.data?.data ?? null;
      set({
        authUser: user,
        role: user?.role ?? null,
      });
    } catch {
      set({ authUser: null, role: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true, error: null });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      const user = res.data?.data ?? null;
      set({ authUser: user, role: user?.role ?? null });
      toast.success('Account Created Successfully');
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error in Signup';
      set({ error: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isSigningIn: true, error: null });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      const user = res.data?.data ?? null;
      set({ authUser: user, role: user?.role ?? null });
      toast.success('Logged in Successfully');
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error in Login';
      set({ authUser: null, role: null, error: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null, role: null });
      toast.success('Logged out Successfully');
    } catch {
      toast.error('Error in Logout');
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (updateUser) => {
    try {
      const userId = get().authUser?._id;
      if (!userId) return;
      const res = await axiosInstance.put(`/auth/updateProfile/${userId}`, updateUser);
      const user = res.data?.data ?? null;
      set({ authUser: user, role: user?.role ?? get().role });
      toast.success('Profile Updated Successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  },
}));

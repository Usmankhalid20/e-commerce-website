import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuth = create((set, get) => ({
  authUser: null,
  // users: [],
  isSigningUp: false,
  isSigninIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,
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
  // Login: async (data) => {
  //   set({ isSigninIn: true });
  //   try {
  //     const res = await axiosInstance.post("/auth/login", data);
  //     console.log(res, "login");
  //     set({ 
  //       authUser: res.data,
  //       role: res.data
  //     });
  //     toast.success("Logged in Successfully");
  //   } catch (error) {
  //     set({
  //       authUser: null,
  //       role: null
  //     });
  //     console.log("error in Login:", error)
  //     toast.error("Error in Login");
  //   } finally {
  //     set({ isSigninIn: false });
  //   }
  // },

Login: async ({ email, password }) => {
  set({ isSigninIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });

    console.log("Login response:", res.data);

    set({ 
      authUser: res.data.user,    // store user object only
      role: res.data.user?.role   // store role separately
    });

    toast.success("Logged in Successfully");
    return res.data; // so caller can check role
  } catch (error) {
    set({
      authUser: null,
      role: null
    });
    console.log("error in Login:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error in Login");
    return null;
  } finally {
    set({ isSigninIn: false });
  }
},

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

}));

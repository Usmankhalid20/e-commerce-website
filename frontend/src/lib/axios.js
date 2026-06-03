import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors like 401 here if needed.
    // e.g., if (error.response && error.response.status === 401) { window.location.href = '/login'; }
    return Promise.reject(error);
  }
);

export default axiosInstance;

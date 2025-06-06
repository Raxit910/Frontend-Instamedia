import axios from 'axios';
import { endpoints } from './endpoints';
import { showError } from '../utils/toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Enable cookie usage by send/receive cookies (JWT token)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for auth tokens or error logging
axiosInstance.interceptors.request.use(
  (config) => {
    //
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

// Notify all subscribers after new token is set
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Retry original request after refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isLoginOrRefresh =
      originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh');

    if (isUnauthorized && !originalRequest._retry && !isLoginOrRefresh) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await axiosInstance.post(endpoints.AUTH.REFRESH_ENDPOINT); // Cookies will handle auth
        isRefreshing = false;
        onRefreshed();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // OPTIONAL: redirect to login here if session is invalid
        showError('Session expired. Please log in again.');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';
import { REFRESH_ENDPOINT } from './endpoints';
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

    // if token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // prevent multiple refresh calls
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await axiosInstance.post(REFRESH_ENDPOINT);
        isRefreshing = false;
        onRefreshed();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        showError('Session expired. Please login again.');
        return Promise.reject(refreshError);
      }
    }

    // try {
    //   await axiosInstance.post(REFRESH_ENDPOINT); // request new access token
    //   isRefreshing = false;
    //   return axiosInstance(originalRequest); // retry original request
    // } catch (refreshErr) {
    //   isRefreshing = false;
    //   showError('Session expired. Please login again.');
    //   // Optionally redirect to login
    //   return Promise.reject(refreshErr);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;

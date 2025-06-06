// eslint-disable-next-line no-undef
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    ACTIVATE: '/api/auth/activate',
    REFRESH: '/api/auth/refresh',
  },
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    UPLOAD_AVATAR: '/api/users/avatar',
    FOLLOW: '/api/users/follow',
    FOLLOWERS: '/api/users',
    FOLLOWING: '/api/users',
    SEARCH: '/api/users/search',
  },
};

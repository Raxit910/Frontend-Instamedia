import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const userApi = {
  getUserProfile: (username) => axiosInstance.get(`${endpoints.USER.PROFILE}/${username}`),

  updateProfile: (data) => axiosInstance.put(endpoints.USER.UPDATE_PROFILE, data),

  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return axiosInstance.post(endpoints.USER.UPLOAD_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  toggleFollow: (targetUserId) => axiosInstance.post(`${endpoints.USER.FOLLOW}/${targetUserId}`),

  getFollowers: (userId) => axiosInstance.get(`${endpoints.USER.FOLLOWERS}/${userId}/followers`),

  getFollowing: (userId) => axiosInstance.get(`${endpoints.USER.FOLLOWING}/${userId}/following`),

  searchUsers: (query, skip = 0, take = 10) =>
    axiosInstance.get(endpoints.USER.SEARCH, {
      params: { query, skip, take },
    }),

  getUserPreview: (userId) => axiosInstance.get(`${endpoints.USER.PREVIEW_PROFILE}/${userId}`),
};

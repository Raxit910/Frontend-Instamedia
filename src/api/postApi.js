import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const postApi = {
  createPost: (formData) =>
    axiosInstance.post(endpoints.POST.CREATE_POST, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getPostByUsername: (username) => {
    return axiosInstance.get(`${endpoints.POST.ALL_POST}/${username}`);
  },
  deletePost: (postId) => {
    return axiosInstance.delete(`${endpoints.POST.DELETE_POST}/${postId}`);
  },
};

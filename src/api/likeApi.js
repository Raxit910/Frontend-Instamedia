import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const likeApi = {
  toggleLike: (postId) => axiosInstance.post(`${endpoints.LIKE.TOGGLE_LIKE}/${postId}`),
  getPostLikes: (postId) => {
    return axiosInstance.get(`${endpoints.LIKE.LIKE_USER_LIST}/${postId}`);
  },
};

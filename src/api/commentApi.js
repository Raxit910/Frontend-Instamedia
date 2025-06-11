import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const commentApi = {
  getPostComments: (postId) => {
    return axiosInstance.get(`${endpoints.COMMENT.GET_COMMENTS}/${postId}`);
  },
  createComment: (postId, data) => {
    return axiosInstance.post(`${endpoints.COMMENT.CREATE_COMMENT}/${postId}`, data);
  },
  deleteComment: (commentId) => {
    return axiosInstance.delete(`${endpoints.COMMENT.DELETE_COMMENT}/${commentId}`);
  },
};

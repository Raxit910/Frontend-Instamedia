import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const savedPostApi = {
  toggleSavePost: (postId) =>
    axiosInstance.post(`${endpoints.SAVE_POST.TOGGLE_SAVE_POST}/${postId}`),
  getSavedPosts: () => {
    return axiosInstance.get(endpoints.SAVE_POST.GET_SAVED_POST);
  },
};

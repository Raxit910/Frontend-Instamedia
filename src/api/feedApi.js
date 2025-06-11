import axiosInstance from './axiosInstance';
import { endpoints } from './endpoints';

export const feedApi = {
  getFeed: ({ cursor }) =>
    axiosInstance.get(`${endpoints.FEED.HOME_FEED}`, { params: { cursor, limit: 5 } }),
};

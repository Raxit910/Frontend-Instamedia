export const endpoints = {
  AUTH: {
    REGISTER_ENDPOINT: '/auth/register',
    LOGIN_ENDPOINT: '/auth/login',
    ACTIVATE_ENDPOINT: '/auth/activate',
    FORGOT_PASSWORD_ENDPOINT: '/auth/forgot-password',
    RESET_PASSWORD_ENDPOINT: '/auth/reset-password',
    REFRESH_ENDPOINT: '/auth/refresh',
    LOGOUT_ENDPOINT: '/auth/logout',
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPLOAD_AVATAR: '/users/avatar',
    FOLLOW: '/users/follow',
    FOLLOWERS: '/users',
    FOLLOWING: '/users',
    SEARCH: '/users/search',
    PREVIEW_PROFILE: '/users/preview',
  },
  POST: {
    CREATE_POST: '/posts/create',
    ALL_POST: '/posts/user',
    DELETE_POST: '/posts',
  },
  FEED: {
    HOME_FEED: '/feed/home-feed',
    FOLLOWED_FEED: '/feed/followed-feed',
  },
  LIKE: {
    TOGGLE_LIKE: '/likes',
    LIKE_USER_LIST: 'likes',
  },
  COMMENT: {
    GET_COMMENTS: '/comments',
    CREATE_COMMENT: '/comments',
    DELETE_COMMENT: '/comments',
  },
  SAVE_POST: {
    TOGGLE_SAVE_POST: '/saved-posts',
    GET_SAVED_POST: '/saved-posts',
  },
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MATCH: 'Passwords must match',
  USERNAME_MIN: 'Username must be at least 3 characters',
  USERNAME_MAX: 'Username cannot exceed 30 characters',
  USERNAME_FORMAT: 'Username can only contain letters, numbers, and underscores',
  BIO_MAX: 'Bio cannot exceed 500 characters',
};

export const FILE_CONSTRAINTS = {
  AVATAR: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
};

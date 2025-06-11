import * as yup from 'yup';
import { VALIDATION_MESSAGES } from '../constants/constants';

export const profileUpdateSchema = yup.object({
  username: yup
    .string()
    .min(3, VALIDATION_MESSAGES.USERNAME_MIN)
    .max(30, VALIDATION_MESSAGES.USERNAME_MAX)
    .matches(/^[a-zA-Z0-9_]+$/, VALIDATION_MESSAGES.USERNAME_FORMAT),
  bio: yup.string().max(500, VALIDATION_MESSAGES.BIO_MAX),
});

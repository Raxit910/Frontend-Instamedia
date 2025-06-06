import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
    .required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must include uppercase, lowercase, number, and symbol'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const loginSchema = yup.object().shape({
  emailOrUsername: yup.string().required('Email or Username is required'),
  password: yup.string().required('Password is required'),
});

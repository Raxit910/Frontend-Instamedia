import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/layout/AuthCard';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';
import SubmitButton from '../../components/form/SubmitButton';
import { showError, showSuccess } from '../../utils/toast';
import axiosInstance from '../../api/axiosInstance';
import { endpoints } from '../../api/endpoints';
import { loginSchema } from '../../validations/authSchema';
import { useAuth } from '../../hooks/useAuth'; // <-- import useAuth here

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get login function from Auth context
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(endpoints.AUTH.LOGIN_ENDPOINT, data);
      showSuccess(res.data.message);

      const user = res.data.data.user;

      // 🔄 Set user in context (no token involved)
      login(user);

      // Navigate to protected route after login
      navigate('/dashboard'); // update as needed
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Login failed. Please try again.';
      showError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login to Instamedia" subtitle="Welcome back!">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={loading}>
          <TextInput
            name="emailOrUsername"
            label="Email or Username"
            control={control}
            error={errors.emailOrUsername?.message}
          />
          <PasswordInput
            name="password"
            label="Password"
            control={control}
            error={errors.password?.message}
          />

          <div className="text-right text-sm mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Forgot Password?
            </Link>
          </div>

          <SubmitButton label="Login" loading={loading} />
        </fieldset>
      </form>

      <div className="text-center mt-4 text-sm">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </Link>
      </div>
    </AuthCard>
  );
};

export default Login;

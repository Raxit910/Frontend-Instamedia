import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import AuthCard from '../../components/layout/AuthCard';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';
import SubmitButton from '../../components/form/SubmitButton';
import { showError, showSuccess } from '../../utils/toast';
import axiosInstance from '../../api/axiosInstance';
import { LOGIN_ENDPOINT } from '../../api/endpoints';
import { loginSchema } from '../../validations/authSchema';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(LOGIN_ENDPOINT, data);
      showSuccess(res.data.message);
      // redirect or fetch profile if needed
    } catch (err) {
      showError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login to Instamedia" subtitle="Welcome back!">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextInput name="emailOrUsername" label="Email or Username" control={control} />
        <PasswordInput name="password" label="Password" control={control} />
        <SubmitButton label="Login" loading={loading} />
      </form>
    </AuthCard>
  );
};

export default Login;

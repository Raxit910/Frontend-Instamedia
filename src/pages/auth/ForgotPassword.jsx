import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import axios from '../../api/axiosInstance';
import { endpoints } from '../../api/endpoints';
import { showSuccess, showError } from '../../utils/toast';

import AuthCard from '../../components/layout/AuthCard';
import TextInput from '../../components/form/TextInput';
import SubmitButton from '../../components/form/SubmitButton';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(endpoints.AUTH.FORGOT_PASSWORD_ENDPOINT, data);
      showSuccess(res.data.message);
    } catch (err) {
      showError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Enter your email to receive reset link">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextInput name="email" label="Email" control={control} />
        <SubmitButton label="Send Reset Link" loading={loading} />
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;

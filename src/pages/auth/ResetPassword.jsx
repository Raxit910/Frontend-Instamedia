import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import axios from '../../api/axiosInstance';
import { RESET_PASSWORD_ENDPOINT } from '../../api/endpoints';
import { showSuccess, showError } from '../../utils/toast';

import AuthCard from '../../components/layout/AuthCard';
import PasswordInput from '../../components/form/PasswordInput';
import SubmitButton from '../../components/form/SubmitButton';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must include uppercase, lowercase, number, and symbol'
    ),
});

const ResetPassword = () => {
  const { token } = useParams();
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ password }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${RESET_PASSWORD_ENDPOINT}/${token}`, { password });
      showSuccess(res.data.message);
    } catch (err) {
      showError(err?.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PasswordInput name="password" label="New Password" control={control} />
        <SubmitButton label="Reset Password" loading={loading} />
      </form>
    </AuthCard>
  );
};

export default ResetPassword;

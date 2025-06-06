import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { endpoints } from '../../api/endpoints';
import { registerSchema } from '../../validations/authSchema';

import AuthCard from '../../components/layout/AuthCard';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';
import SubmitButton from '../../components/form/SubmitButton';
import { showSuccess, showError } from '../../utils/toast';
import axiosInstance from '../../api/axiosInstance';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // console.log(data);

    try {
      const response = await axiosInstance.post(endpoints.AUTH.REGISTER_ENDPOINT, data);
      // console.log('new', response);
      showSuccess(response.data.message);
      reset();
    } catch (err) {
      showError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account" subtitle="Register to join Instamedia">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextInput name="username" label="Username" control={control} />
        <TextInput name="email" label="Email" control={control} />
        <PasswordInput name="password" label="Password" control={control} />
        <PasswordInput name="confirmPassword" label="Confirm Password" control={control} />
        <SubmitButton label="Register" loading={loading} />
      </form>
      <div className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default Register;

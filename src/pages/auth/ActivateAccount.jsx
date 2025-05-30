import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { ACTIVATE_ENDPOINT } from '../../api/endpoints';
import { showSuccess, showError } from '../../utils/toast';

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const calledRef = useRef(false); // Prevent multiple calls

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(`${ACTIVATE_ENDPOINT}/${token}`);
        showSuccess(res.data.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (err) {
        showError(err?.response?.data?.message || 'Activation failed');
      }
    };

    if (token && !calledRef.current) {
      calledRef.current = true; // Mark as executed
      activate();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-red-400 px-4">
      <div className="text-center w-full max-w-md bg-white shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-2">Activating your account...</h2>
        <p className="text-sm text-gray-700">Please wait</p>
      </div>
    </div>
  );
};

export default ActivateAccount;

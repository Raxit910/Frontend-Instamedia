import { useState, useEffect, createContext, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { endpoints } from '../api/endpoints';
import { showError, showSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasTriedLogin = sessionStorage.getItem('hasTriedLogin'); // use session flag to avoid running on cold start

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Try only if session indicates prior login
    if (hasTriedLogin) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    // Set session flag on successful login
    sessionStorage.setItem('hasTriedLogin', 'true');
    // console.log(userData);
    setUser(userData);
  };

  const logout = async () => {
    try {
      setUser(null);
      sessionStorage.removeItem('hasTriedLogin');
      await axiosInstance.post(endpoints.AUTH.LOGOUT_ENDPOINT);
      showSuccess('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout API error:', err);
      showError('Failed to logout from server');
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

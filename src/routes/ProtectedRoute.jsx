import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return authUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

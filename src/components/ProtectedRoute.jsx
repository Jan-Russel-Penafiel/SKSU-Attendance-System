import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, getUserRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin) {
    const role = getUserRole();
    if (role !== 'admin') {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return children;
}

export default ProtectedRoute;
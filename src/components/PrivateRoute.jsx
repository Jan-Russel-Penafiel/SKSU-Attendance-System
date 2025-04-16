import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

function PrivateRoute({ children, requireAdmin = false }) {
  const { currentUser, getUserRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuthorization() {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      if (requireAdmin) {
        try {
          const role = await getUserRole();
          setAuthorized(role === 'admin');
        } catch (error) {
          console.error('Error checking admin role:', error);
          setAuthorized(false);
        }
      } else {
        setAuthorized(true);
      }
      
      setLoading(false);
    }
    
    checkAuthorization();
  }, [currentUser, getUserRole, requireAdmin]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!authorized) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute; 
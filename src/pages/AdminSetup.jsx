import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { promoteToAdmin } from '../firebase/adminSetup';
import { TextField, Button, Box, Typography, Container, Alert, Paper } from '@mui/material';

function AdminSetup() {
  const [userId, setUserId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handlePromoteAdmin(e) {
    e.preventDefault();
    
    if (!userId.trim()) {
      return setError('Please enter a user ID');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await promoteToAdmin(userId);
      setSuccess(`User ${userId} has been promoted to admin successfully`);
      setUserId('');
    } catch (error) {
      setError('Failed to promote user: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function promoteSelf() {
    if (!currentUser) {
      return setError('You must be logged in to promote yourself');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await promoteToAdmin(currentUser.uid);
      setSuccess('You have been promoted to admin successfully. Please log out and log back in to see the changes.');
    } catch (error) {
      setError('Failed to promote yourself: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Admin Setup
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Current User Information
          </Typography>
          {currentUser ? (
            <Box>
              <Typography variant="body1">
                <strong>Your User ID:</strong> {currentUser.uid}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={promoteSelf}
                  disabled={loading}
                >
                  Promote Yourself to Admin
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography color="error">
              You must be logged in to use this page.
            </Typography>
          )}
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Promote Another User to Admin
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <Box component="form" onSubmit={handlePromoteAdmin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              helperText="Enter the Firebase User ID of the user you want to promote"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Promote to Admin
            </Button>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminSetup; 
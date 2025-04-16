import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (idNumber.trim() === '') {
      return setError('ID Number is required');
    }

    try {
      setError('');
      setLoading(true);
      await signup(idNumber, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      {/* Logo Circle */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        mb: 3
      }}>
        <Box sx={{ 
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          marginBottom: -2,
          border: '2px solid rgba(255,255,255,0.2)'

        }}>
          <img 
            src="/sksu.png" 
            alt="SKSU Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
      
      {/* App Title */}
      <Typography className="app-title">
        Attendance
      </Typography>
      <Typography className="app-subtitle">
        TRACKING
      </Typography>

      {/* Form Container */}
      <div className="form-container">
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="idNumber"
            label="ID Number"
            name="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Already have an account? <Link to="/login" style={{ color: 'white', fontWeight: 'bold' }}>Log In</Link>
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Register; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Box, Typography, Container, Alert, Paper } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      setError('Failed to log in: ' + error.message);
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
          marginBottom: -2,

          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Don't have an account? <Link to="/register" style={{ color: 'white', fontWeight: 'bold' }}>Register</Link>
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Login; 
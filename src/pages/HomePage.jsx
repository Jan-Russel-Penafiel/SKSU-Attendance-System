import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

function HomePage() {
  return (
    <Box className="app-container">
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
      
      <Typography className="app-title slide-up">
        Attendance
      </Typography>
      <Typography className="app-subtitle slide-up">
        TRACKING
      </Typography>
      
      <Paper 
        className="form-container fade-in" 
        sx={{ 
          p: 4, 
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Simplify attendance with QR code technology
        </Typography>
        
        <Box className="slide-up" sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Key Features:
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Paper sx={{ 
              flex: '1 1 45%', 
              minWidth: { xs: '100%', sm: '45%' }, 
              p: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                For Students
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'white' }}>
                <li>Personal QR code</li>
                <li>Attendance history</li>
                <li>User-friendly interface</li>
              </ul>
            </Paper>
            
            <Paper sx={{ 
              flex: '1 1 45%', 
              minWidth: { xs: '100%', sm: '45%' }, 
              p: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                For Administrators
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'white' }}>
                <li>QR code scanner</li>
                <li>Attendance records</li>
                <li>Data export tools</li>
              </ul>
            </Paper>
          </Box>
        </Box>
        
        <Box className="slide-up" sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/register"
            size="large"
            className="pulse"
            sx={{ minWidth: '120px' }}
          >
            Register
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/login"
            size="large"
            sx={{ 
              minWidth: '120px',
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default HomePage; 
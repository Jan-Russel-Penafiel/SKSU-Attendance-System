import { Box, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  // Don't show footer on admin and student dashboard pages
  if (
    location.pathname === '/admin' || 
    location.pathname === '/dashboard' ||
    location.pathname === '/admin-setup'
  ) {
    return null;
  }
  
  return (
    <Box className="app-footer">
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'white', 
          fontWeight: 500,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        Attendance Tracking System created by JR Elizares &copy; March 23, 2025
      </Typography>
      <Box 
        sx={{ 
          mt: 1.5, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3,
          flexWrap: 'wrap'
        }}
      >
        <RouterLink 
          to="/privacy-policy" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
          className="footer-link"
        >
          Privacy Policy
        </RouterLink>
        <RouterLink 
          to="/terms-of-service" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
          className="footer-link"
        >
          Terms of Service
        </RouterLink>
        <RouterLink 
          to="/contact" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
          className="footer-link"
        >
          Contact
        </RouterLink>
      </Box>
    </Box>
  );
}

export default Footer; 
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 6, 
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 4,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Privacy Policy
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
            Last Updated: {new Date().toLocaleDateString()}
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            At Attendance Tracking System, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Information Collection
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We collect information that you provide directly to us, such as when you create an account, update your profile, or use our attendance tracking features. This may include your name, email address, password, and attendance records.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Use of Information
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We use the information we collect to provide, maintain, and improve our services, including tracking attendance and generating reports. We may also use the information to communicate with you about our services, provide customer support, and ensure compliance with our policies.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Data Security
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Data Retention
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We retain your information for as long as your account is active or as needed to provide you services. We may also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Changes to Privacy Policy
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </Typography>
        </Paper>
        
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          sx={{ 
            mt: 2,
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy; 
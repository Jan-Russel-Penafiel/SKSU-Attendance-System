import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function TermsOfService() {
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
          Terms of Service
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
            Welcome to the Attendance Tracking System. By accessing or using our application, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Use of the Service
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            The Attendance Tracking System is designed to help educational institutions and organizations track attendance. You may use this service only for authorized and legitimate purposes.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            User Accounts
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            To use certain features of the service, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Data Accuracy
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            Users are responsible for ensuring the accuracy of their attendance records. Administrators should verify attendance data regularly and report any discrepancies.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Intellectual Property
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            All content, features, and functionality of the Attendance Tracking System, including but not limited to text, graphics, logos, and software, are the exclusive property of our company and are protected by copyright, trademark, and other intellectual property laws.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Limitation of Liability
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            In no event shall the Attendance Tracking System be liable for any indirect, incidental, special, consequential, or punitive damages, arising out of or relating to your use of the service.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 4, mb: 2 }}>
            Changes to Terms
          </Typography>
          
          <Typography paragraph sx={{ color: 'white', mb: 3 }}>
            We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes. Your continued use of the service after such changes constitutes your acceptance of the new terms.
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

export default TermsOfService; 
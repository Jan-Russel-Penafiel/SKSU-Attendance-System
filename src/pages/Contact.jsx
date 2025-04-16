import { useState } from 'react';
import { Box, Typography, Container, Paper, Button, TextField, Grid, Alert, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError(true);
      return;
    }
    
    // In a real app, you'd send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const handleCloseSnackbar = () => {
    setSubmitted(false);
    setError(false);
  };
  
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
          Contact Us
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
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
                Get in Touch
              </Typography>
              
              <Typography paragraph sx={{ color: 'white', mb: 3 }}>
                Have questions about our Attendance Tracking System? We're here to help! Fill out the form and our team will get back to you as soon as possible.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                  Email:
                </Typography>
                <Typography paragraph sx={{ color: 'white', mb: 3 }}>
                  support@attendancetracking.com
                </Typography>
                
                <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                  Phone:
                </Typography>
                <Typography paragraph sx={{ color: 'white', mb: 3 }}>
                  +1 (555) 123-4567
                </Typography>
                
                <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                  Office Hours:
                </Typography>
                <Typography paragraph sx={{ color: 'white', mb: 3 }}>
                  Monday - Friday: 9:00 AM - 5:00 PM
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--primary-color)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--primary-color)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--primary-color)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--primary-color)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />
                
                <Button 
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                    }
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Grid>
          </Grid>
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
      
      <Snackbar open={submitted} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
      
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Please fill out all required fields.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 
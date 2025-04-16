import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';

function Navigation() {
  const [userRole, setUserRole] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout, getUserRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkUserRole() {
      if (currentUser) {
        try {
          const role = await getUserRole();
          setUserRole(role);
        } catch (error) {
          console.error('Failed to get user role:', error);
        }
      } else {
        setUserRole(null);
      }
    }
    
    checkUserRole();
  }, [currentUser, getUserRole]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
      handleMenuClose();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Don't show nav on login, register, or home pages
  if (
    location.pathname === '/login' || 
    location.pathname === '/register' || 
    location.pathname === '/' ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/terms-of-service' ||
    location.pathname === '/contact'
  ) {
    return null;
  }

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(10, 25, 41, 0.9)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        mb: 3
      }}
    >
      <Toolbar>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mr: 1.5,
          }}
        >
          <Box sx={{ 
            width: 40,
            height: 40,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)'
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
        
        <Typography 
          variant="h6" 
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: 0.5,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Attendance Tracking
        </Typography>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {currentUser && (
            <>
              {userRole === 'admin' && (
                <Button 
                  component={Link} 
                  to="/admin"
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Admin Dashboard
                </Button>
              )}
              {location.pathname !== '/admin' && (
                <Button 
                  component={Link} 
                  to="/dashboard"
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Dashboard
                </Button>
              )}
              {userRole === 'admin' && (
                <Button 
                  component={Link} 
                  to="/admin-setup"
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Admin Setup
                </Button>
              )}
              <Button 
                onClick={handleLogout}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  },
                  transition: 'all 0.2s ease',
                  ml: 1
                }}
              >
                Logout
              </Button>
            </>
          )}
          {!currentUser && (
            <>
              <Button 
                component={Link} 
                to="/login"
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                  py: 0.8,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register"
                variant="contained"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              width: 40,
              height: 40
            }}
          >
            <Typography sx={{ fontSize: '1.2rem' }}>☰</Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                backgroundColor: 'rgba(10, 25, 41, 0.95)',
                backdropFilter: 'blur(12px)',
                mt: 0.5,
                color: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                borderRadius: '12px'
              }
            }}
          >
            {currentUser && (
              <>
                {userRole === 'admin' && (
                  <MenuItem 
                    component={Link} 
                    to="/admin" 
                    onClick={handleMenuClose}
                    sx={{ 
                      color: 'white',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Admin Dashboard
                  </MenuItem>
                )}
                {location.pathname !== '/admin' && (
                  <MenuItem 
                    component={Link} 
                    to="/dashboard" 
                    onClick={handleMenuClose}
                    sx={{ 
                      color: 'white',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Dashboard
                  </MenuItem>
                )}
                {userRole === 'admin' && (
                  <MenuItem 
                    component={Link} 
                    to="/admin-setup" 
                    onClick={handleMenuClose}
                    sx={{ 
                      color: 'white',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Admin Setup
                  </MenuItem>
                )}
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    color: 'white',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    py: 1.5,
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Logout
                </MenuItem>
              </>
            )}
            {!currentUser && (
              <>
                <MenuItem 
                  component={Link} 
                  to="/login" 
                  onClick={handleMenuClose}
                  sx={{ 
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/register" 
                  onClick={handleMenuClose}
                  sx={{ 
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation; 
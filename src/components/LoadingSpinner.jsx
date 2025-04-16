import { Box, Typography } from '@mui/material';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        minHeight: '200px'
      }}
    >
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && (
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2, 
            opacity: 0.8,
            animation: 'pulse 2s infinite ease-in-out'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default LoadingSpinner; 
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Box, Typography, CircularProgress, Button, Alert, TextField, Snackbar } from '@mui/material';

function QRScanner({ onScanSuccess }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    let scanner;
    try {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 20,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1.0,
          disableFlip: false,
          formatsToSupport: [0],
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          focusMode: 'continuous',
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        },
        false
      );

      const success = (result) => {
        console.log("QR Code scanned successfully:", result);
        scanner.clear();
        onScanSuccess(result);
      };

      const error = (err) => {
        console.warn("QR Code scan error:", err);
        if (err.includes("NotReadableError") || err.includes("Failed to allocate videosource")) {
          setError("Camera access error: The camera may be in use by another application or there might be a hardware issue.");
        }
      };

      scanner.render(success, error);
      setIsScanning(true);
      setScannerInitialized(true);
    } catch (err) {
      console.error("Scanner initialization error:", err);
      setError(`Failed to initialize scanner: ${err.toString()}`);
      setShowManualInput(true);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(error => {
          console.error("Failed to clear scanner:", error);
        });
      }
      setIsScanning(false);
    };
  }, [onScanSuccess]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      setError('Please enter an ID number');
      return;
    }

    console.log("Manual code submitted:", manualCode);
    try {
      setIsSubmitting(true);
      setError('');
      
      console.log("Calling onScanSuccess with:", manualCode.trim());
      await onScanSuccess(manualCode.trim());
      
      console.log("Manual submission successful");
      setSubmitSuccess(true);
      setManualCode('');
      
      // Keep the form visible but clear it for potential additional entries
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error in manual submission:", err);
      setError('Failed to record attendance: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          color: 'white', 
          fontWeight: 600,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        Scan QR Code
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            width: '100%', 
            mb: 2,
            backgroundColor: 'rgba(211, 47, 47, 0.15) !important',
            color: '#ffb8b8 !important',
            '& .MuiAlert-icon': {
              color: '#ffb8b8 !important'
            },
            border: '1px solid rgba(211, 47, 47, 0.3)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }} 
          onClose={clearError}
        >
          <Typography sx={{ color: '#ffb8b8', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{error}</Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleRetry}
              sx={{ 
                color: '#ffb8b8',
                borderColor: 'rgba(255, 184, 184, 0.5)',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                '&:hover': {
                  borderColor: '#ffb8b8',
                  backgroundColor: 'rgba(255, 184, 184, 0.08)'
                }
              }}
            >
              Retry Camera
            </Button>
            <Button 
              size="small" 
              variant="outlined"
              onClick={() => setShowManualInput(true)}
              sx={{ 
                color: '#ffb8b8',
                borderColor: 'rgba(255, 184, 184, 0.5)',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                '&:hover': {
                  borderColor: '#ffb8b8',
                  backgroundColor: 'rgba(255, 184, 184, 0.08)'
                }
              }}
            >
              Enter Code Manually
            </Button>
          </Box>
        </Alert>
      )}

      {!scannerInitialized && !error && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 1,
          color: 'white'
        }}>
          <CircularProgress sx={{ color: 'white' }} />
          <Typography sx={{ color: 'white', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
            Initializing scanner...
          </Typography>
        </Box>
      )}
      
      <Box 
        id="reader" 
        sx={{ 
          width: '100%',
          maxWidth: { xs: '300px', sm: '400px' },
          margin: '0 auto',
          display: showManualInput ? 'none' : 'block',
          '& video': {
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
          },
          '& section': {
            background: 'rgba(30, 40, 50, 0.7) !important',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          },
          '& img': {
            borderRadius: '8px'
          },
          '& div': {
            color: 'white !important'
          },
          '& button': {
            backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
            color: 'white !important',
            border: 'none !important',
            borderRadius: '8px !important',
            padding: '6px 16px !important',
            fontWeight: '500 !important'
          },
          '& select': {
            backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
            color: 'white !important',
            border: 'none !important',
            borderRadius: '8px !important',
            padding: '6px 8px !important'
          }
        }}
      />
      
      {!error && isScanning && !showManualInput && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            mt: 2,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.85rem' }
          }}
        >
          Position the QR code within the frame
        </Typography>
      )}
      
      {(showManualInput || error) && (
        <Box component="form" onSubmit={handleManualSubmit} sx={{ 
          width: '100%', 
          maxWidth: { xs: '300px', sm: '400px' },
          mt: 2,
          p: { xs: 2, sm: 3 },
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-5px)'
          }
        }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'white',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1.1rem' }
            }}
          >
            Manual ID Input
          </Typography>
          
          {submitSuccess && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(46, 125, 50, 0.15) !important',
                color: '#b3ffb6 !important',
                '& .MuiAlert-icon': {
                  color: '#b3ffb6 !important'
                },
                border: '1px solid rgba(46, 125, 50, 0.3)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontSize: { xs: '0.75rem', sm: '0.85rem' }
              }}
            >
              <Typography sx={{ color: '#b3ffb6', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                Attendance recorded successfully!
              </Typography>
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="Enter ID Number"
              variant="outlined"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Enter ID number"
              disabled={isSubmitting}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.6)'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white'
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' }
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
              sx={{ 
                height: { xs: '45px', sm: '56px' }, 
                minWidth: { xs: '100%', sm: '120px' },
                mt: { xs: 1, sm: 0 },
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      )}

      {!showManualInput && !error && (
        <Button 
          variant="text" 
          onClick={() => setShowManualInput(true)}
          sx={{ 
            mt: 2,
            color: 'white',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)'
            }
          }}
        >
          Can't scan? Enter ID manually
        </Button>
      )}
    </Box>
  );
}

export default QRScanner; 
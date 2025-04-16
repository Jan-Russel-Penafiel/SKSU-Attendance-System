import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateQRCode } from '../utils/qrCode';
import { Box, Typography, Button, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Alert, IconButton } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import QRScanner from '../components/QRScanner';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [recordsError, setRecordsError] = useState('');
  const [scanResult, setScanResult] = useState('');
  const { currentUser, logout, getUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      try {
        const data = await getUserData();
        setUserData(data);
        
        // Generate QR code with user ID Number
        if (data && data.idNumber) {
          const qrCodeUrl = await generateQRCode(data.idNumber);
          setQrCode(qrCodeUrl);
          
          // Fetch attendance records once we have the ID number
          fetchAttendanceRecords(data.idNumber);
        } else {
          setError("No ID number found in your profile. Please contact an administrator.");
        }
      } catch (error) {
        setError('Failed to load user data: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [currentUser, getUserData, navigate]);

  async function fetchAttendanceRecords(idNumber) {
    if (!idNumber) return;
    
    setLoadingRecords(true);
    setRecordsError(''); // Clear previous errors
    
    try {
      console.log("Attempting to fetch attendance records for ID:", idNumber);
      
      // First check if the collection exists
      const collectionRef = collection(db, "attendance");
      
      // Query the attendance collection for records matching this student's ID
      // Remove the orderBy clause initially to see if that's causing issues
      const q = query(
        collectionRef,
        where("idNumber", "==", idNumber)
      );
      
      console.log("Query created, attempting to fetch data...");
      const querySnapshot = await getDocs(q);
      console.log("Query executed, snapshot received. Document count:", querySnapshot.size);
      
      const records = [];
      
      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          console.log("Processing record:", doc.id, data);
          
          // Safely handle potential missing timestamp field
          let recordDate;
          if (data.timestamp && typeof data.timestamp.toDate === 'function') {
            recordDate = data.timestamp.toDate();
          } else if (data.date && typeof data.date.toDate === 'function') {
            // Try alternative field name
            recordDate = data.date.toDate();
          } else {
            // Fallback to current date if no valid timestamp found
            console.warn("No valid timestamp found in record:", doc.id);
            recordDate = new Date();
          }
          
          records.push({
            id: doc.id,
            date: recordDate,
            status: data.status || 'Present'
          });
        } catch (recordError) {
          console.error("Error processing individual record:", doc.id, recordError);
          // Continue processing other records
        }
      });
      
      console.log("Total records processed:", records.length);
      
      // Sort manually since we removed the orderBy
      records.sort((a, b) => b.date - a.date);
      
      setAttendanceRecords(records);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      // More detailed error message
      setRecordsError(`Failed to fetch attendance records: ${error.message || error}`);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out: ' + error.message);
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Late':
        return 'warning';
      case 'Absent':
        return 'error';
      case 'Excused':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleRefreshRecords = () => {
    if (userData && userData.idNumber) {
      fetchAttendanceRecords(userData.idNumber);
    }
  };

  const handleScanSuccess = (result) => {
    console.log("QR code scanned:", result);
    setScanResult(result);
    // Here you could implement logic to record attendance with the scanned ID
  };

  if (loading) {
    return (
      <Box className="app-container" sx={{ justifyContent: 'center' }}>
        <LoadingSpinner message="Loading dashboard..." />
      </Box>
    );
  }
  
  return (
    <Box className="app-container" sx={{ px: { xs: 1, sm: 2 } }}>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        mt: { xs: 2, sm: 4 }
      }}>
        <Box sx={{ 
          width: { xs: 70, sm: 100 },
          height: { xs: 70, sm: 100 },
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          border: '2px solid rgba(255,255,255,0.3)',
          margin: '0 auto',
          marginTop: { xs: -5, sm: -10 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src="/sksu.png" 
            alt="SKSU Logo" 
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        </Box>
      </Box>
      
      <Typography className="app-title slide-up" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Student Dashboard
      </Typography>
      
      {error && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 1.5, sm: 2 }, 
            mb: { xs: 2, sm: 3 }, 
            backgroundColor: 'rgba(211, 47, 47, 0.2)', 
            color: '#ffb8b8',
            width: '100%',
            maxWidth: { xs: '95%', sm: '400px' },
            borderRadius: '8px'
          }}
          className="fade-in"
        >
          <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{error}</Typography>
        </Paper>
      )}

      <Paper 
        className="form-container fade-in" 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          width: '100%', 
          maxWidth: { xs: '100%', sm: '600px' },
          mx: 'auto'
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ 
            mb: { xs: 2, sm: 3 },
            '& .MuiTab-root': {
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              minWidth: 'auto',
              px: { xs: 1, sm: 2 }
            }
          }}
        >
          <Tab label="Profile" />
          <Tab label="Attendance Records" />
          {userData && userData.role === 'admin' && <Tab label="Scan QR" />}
        </Tabs>
        {tabValue === 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Your Profile
            </Typography>
            
            {userData && (
              <Box sx={{ my: { xs: 1, sm: 2 } }} className="slide-up">
                <Box sx={{ 
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '8px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  mb: { xs: 1.5, sm: 2 }
                }}>
                  <Typography sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    <strong>ID Number:</strong> {userData.idNumber}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    <strong>Email:</strong> {userData.email}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }} className="slide-up">
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' } }}>
                Attendance QR Code
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontSize: { xs: '0.75rem', sm: '0.9rem' } }}>
                Show this QR code to your instructor to mark your attendance
              </Typography>
              
              {qrCode ? (
                <Box 
                  sx={{ 
                    mt: { xs: 1, sm: 2 }, 
                    p: { xs: 1.5, sm: 3 },
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    },
                    maxWidth: { xs: '200px', sm: '250px' }
                  }}
                >
                  <img 
                    src={qrCode} 
                    alt="Attendance QR Code" 
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      display: 'block'
                    }} 
                  />
                </Box>
              ) : (
                <Typography sx={{ color: '#ffb8b8', mt: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                  Failed to generate QR code
                </Typography>
              )}
            </Box>
          </>
        )}
        
        {tabValue === 1 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' } }}>
                Attendance History
              </Typography>
              
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleRefreshRecords}
                disabled={loadingRecords}
                sx={{ 
                  minWidth: 'auto', 
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.5, sm: 0.75 }
                }}
              >
                Refresh
              </Button>
            </Box>
        
            <Typography variant="body2" paragraph sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, my: { xs: 1, sm: 1.5 } }}>
              View your attendance records below. Records are ordered by date, with the most recent at the top.
            </Typography>
            
            {recordsError && (
              <Alert 
                severity="error" 
                sx={{ mb: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                action={
                  <Button 
                    color="inherit" 
                    size="small" 
                    onClick={handleRefreshRecords}
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                  >
                    Try Again
                  </Button>
                }
              >
                {recordsError}
              </Alert>
            )}
            
            {loadingRecords ? (
              <Box sx={{ py: { xs: 2, sm: 4 }, display: 'flex', justifyContent: 'center' }}>
                <LoadingSpinner message="Loading attendance records..." />
              </Box>
            ) : attendanceRecords.length > 0 ? (
              <TableContainer component={Paper} sx={{ 
                maxHeight: { xs: 300, sm: 350 }, 
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                }
              }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>Date</TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>Time</TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id} className="fade-in" sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}>
                        <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>
                          {format(record.date, 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>
                          {format(record.date, 'hh:mm a')}
                        </TableCell>
                        <TableCell align="center" sx={{ py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 2 } }}>
                          <Chip 
                            label={record.status} 
                            color={getStatusColor(record.status)}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              minWidth: { xs: '60px', sm: '80px' },
                              fontSize: { xs: '0.65rem', sm: '0.75rem' },
                              height: { xs: '22px', sm: '24px' }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ 
                p: { xs: 2, sm: 3 }, 
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>No attendance records found.</Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.7, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                  Your attendance will be recorded when your QR code is scanned.
                </Typography>
              </Box>
            )}
          </>
        )}
        
        {tabValue === 2 && userData && userData.role === 'admin' && (
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mx: 'auto', overflow: 'hidden', borderRadius: '12px' }}>
              <QRScanner onScanSuccess={handleScanSuccess} />
              {scanResult && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                    Scanned ID Number: <strong>{scanResult}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: 'success.main' }}>
                    Attendance recorded successfully!
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard; 
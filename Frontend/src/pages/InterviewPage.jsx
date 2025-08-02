import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InterviewSimulator from '../components/InterviewSimulator';
import { Box, Button, CircularProgress, Typography, Alert } from '@mui/material';

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.question || !location.state?.interviewId) {
      setError('Missing interview data. Please start a new interview.');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2, 
        p: 4 
      }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <InterviewSimulator 
      question={location.state.question}
      interviewId={location.state.interviewId}
    />
  );
};

export default InterviewPage;
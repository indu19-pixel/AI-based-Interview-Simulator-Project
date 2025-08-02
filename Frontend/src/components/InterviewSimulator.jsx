import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Alert, 
  CircularProgress,
  Button
} from '@mui/material';
import QuestionDisplay from './QuestionDisplay';
import AudioRecorder from './AudioRecorder';
import FeedbackDisplay from './FeedbackDisplay';
import { evaluateInterview } from '../services/api';

const InterviewSimulator = ({ question, interviewId }) => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitResponse = async (audioBlob) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would upload the audio here first
      const simulatedResponse = "This is a simulated response to the interview question.";
      
      const response = await evaluateInterview(interviewId, simulatedResponse);
      setFeedback(response.data.feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewInterview = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Interview Session
      </Typography>

      <QuestionDisplay question={question} />

      {!feedback ? (
        <>
          <AudioRecorder 
            onRecordingComplete={handleSubmitResponse}
            disabled={loading}
          />
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </>
      ) : (
        <>
          <FeedbackDisplay feedback={feedback} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleNewInterview}
            >
              Start New Interview
            </Button>
          </Box>
        </>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default InterviewSimulator;
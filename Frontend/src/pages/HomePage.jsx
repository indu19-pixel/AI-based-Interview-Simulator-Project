import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { startInterview } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('Java');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await startInterview(topic, difficulty);
      navigate('/interview', { 
        state: { 
          question: response.data.question,
          interviewId: response.data.id 
        } 
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          gap: 3,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          AI Interview Simulator
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Practice your technical interview skills with AI-powered feedback
        </Typography>

        <FormControl fullWidth sx={{ maxWidth: 400 }}>
          <InputLabel>Topic</InputLabel>
          <Select
            value={topic}
            label="Topic"
            onChange={(e) => setTopic(e.target.value)}
          >
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Data Structures">Data Structures</MenuItem>
            <MenuItem value="Algorithms">Algorithms</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ maxWidth: 400 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          onClick={handleStartInterview}
          disabled={loading}
          sx={{ width: 200, height: 50, mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Start Interview'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
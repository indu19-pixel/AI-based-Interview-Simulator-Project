import { Box, Typography, Paper } from '@mui/material';

const QuestionDisplay = ({ question }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Interview Question
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {question}
      </Typography>
    </Paper>
  );
};

export default QuestionDisplay;
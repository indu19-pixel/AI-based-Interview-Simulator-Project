import { Box, Typography, Paper, Divider } from '@mui/material';

const FeedbackDisplay = ({ feedback }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Feedback
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {feedback}
      </Typography>
    </Paper>
  );
};

export default FeedbackDisplay;
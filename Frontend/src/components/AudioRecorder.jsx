import { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Mic, Stop, Send } from '@mui/icons-material';
import RecordRTC from 'recordrtc';

const AudioRecorder = ({ onRecordingComplete, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
      });
      
      recorderRef.current = recorder;
      recorder.startRecording();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        setRecordedBlob(blob);
        setIsRecording(false);
        clearInterval(timerRef.current);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      });
    }
  };

  const handleSubmit = async () => {
    if (recordedBlob) {
      await onRecordingComplete(recordedBlob);
      setRecordedBlob(null);
    }
  };

  useEffect(() => {
    return () => {
      if (recorderRef.current) {
        recorderRef.current.destroy();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box sx={{ 
      border: '1px solid #ddd', 
      borderRadius: 2, 
      p: 3, 
      mt: 3,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h6" gutterBottom>
        Record Your Answer
      </Typography>
      
      {isRecording ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Stop />}
            onClick={stopRecording}
            disabled={disabled}
          >
            Stop Recording
          </Button>
          <Typography variant="body1">
            {formatTime(recordingTime)}
          </Typography>
        </Box>
      ) : recordedBlob ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <audio controls src={URL.createObjectURL(recordedBlob)} />
          <Button
            variant="contained"
            color="success"
            startIcon={<Send />}
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit Response
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Mic />}
          onClick={startRecording}
          disabled={disabled}
        >
          Start Recording
        </Button>
      )}
    </Box>
  );
};

export default AudioRecorder;
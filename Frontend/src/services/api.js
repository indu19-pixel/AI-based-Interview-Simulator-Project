import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8084/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock functions for development
const mockStartInterview = async (topic, difficulty) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      id: 'mock-interview-id',
      question: `Mock ${topic} question (${difficulty} difficulty): Explain the concept of inheritance in ${topic}.`,
      feedback: null
    }
  }), 1000));
};

const mockEvaluateInterview = async (interviewId, response) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      feedback: `Mock feedback for your response: You demonstrated good understanding of the topic. Score: 8/10.`
    }
  }), 1500));
};

export const startInterview = async (topic, difficulty) => {
  try {
    // For development, use mock function
    if (process.env.NODE_ENV === 'development') {
      return await mockStartInterview(topic, difficulty);
    }
    
    const response = await api.post('/interview/start', { topic, difficulty });
    return response;
  } catch (error) {
    console.error('Error starting interview:', error);
    throw new Error(error.response?.data?.message || 'Failed to start interview');
  }
};

export const evaluateInterview = async (interviewId, response) => {
  try {
    // For development, use mock function
    if (process.env.NODE_ENV === 'development') {
      return await mockEvaluateInterview(interviewId, response);
    }
    
    const response = await api.post(`/interview/${interviewId}/evaluate`, { response });
    return response;
  } catch (error) {
    console.error('Error evaluating interview:', error);
    throw new Error(error.response?.data?.message || 'Failed to evaluate response');
  }
};

export default api;
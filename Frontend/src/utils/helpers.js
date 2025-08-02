export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const analyzeResponseQuality = (feedback) => {
  // This would analyze the feedback text to extract scores
  // In a real app, this would parse the structured feedback
  const techMatch = feedback.match(/Technical accuracy.*?(\d+)/i);
  const clarityMatch = feedback.match(/Clarity.*?(\d+)/i);
  const confidenceMatch = feedback.match(/Confidence.*?(\d+)/i);
  
  return {
    technical: techMatch ? parseInt(techMatch[1]) : 0,
    clarity: clarityMatch ? parseInt(clarityMatch[1]) : 0,
    confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 0,
  };
};
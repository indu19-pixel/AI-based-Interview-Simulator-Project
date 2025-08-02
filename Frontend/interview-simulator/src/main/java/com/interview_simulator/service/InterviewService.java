package com.interview_simulator.service;


import com.interview_simulator.model.Interview;
import com.interview_simulator.repository.InterviewRepository;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {
    private final OpenAiService openAiService;
    private final InterviewRepository interviewRepository;
    
    public Interview startInterview(String topic, String difficulty, String userId) {
        String question = generateQuestion(topic, difficulty);
        
        Interview interview = new Interview();
        interview.setUserId(userId);
        interview.setTopic(topic);
        interview.setDifficulty(difficulty);
        interview.setQuestion(question);
        
        return interviewRepository.save(interview);
    }
    
    private String generateQuestion(String topic, String difficulty) {
        String prompt = String.format(
            "Act as a technical interviewer. Generate one interview question about %s with %s difficulty level. " +
            "The question should test practical knowledge and problem-solving skills. " +
            "Format the question clearly and professionally.", 
            topic, difficulty);
            
        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo")
            .messages(List.of(new ChatMessage("user", prompt)))
            .temperature(0.7)
            .maxTokens(100)
            .build();
            
        return openAiService.createChatCompletion(completionRequest)
            .getChoices()
            .get(0)
            .getMessage()
            .getContent();
    }
    
    public Interview evaluateResponse(Long interviewId, String response) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found"));
        
        String feedback = generateFeedback(interview.getQuestion(), response);
        
        interview.setUserResponse(response);
        interview.setFeedback(feedback);
        
        return interviewRepository.save(interview);
    }
    
    private String generateFeedback(String question, String response) {
        String prompt = String.format(
            "Evaluate this interview response professionally. Provide specific feedback on:\n" +
            "1. Technical accuracy (score 1-10)\n" +
            "2. Clarity of explanation (score 1-10)\n" +
            "3. Confidence (score 1-10)\n" +
            "4. Overall impression\n" +
            "5. Specific areas for improvement\n\n" +
            "Question: %s\nResponse: %s", question, response);
            
        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo")
            .messages(List.of(new ChatMessage("user", prompt)))
            .temperature(0.5)
            .maxTokens(300)
            .build();
            
        return openAiService.createChatCompletion(completionRequest)
            .getChoices()
            .get(0)
            .getMessage()
            .getContent();
    }

    public Object getInterviewById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getInterviewById'");
    }
}
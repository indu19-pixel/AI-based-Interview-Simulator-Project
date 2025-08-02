package com.interview_simulator.controller;

import com.interview_simulator.model.Interview;
import com.interview_simulator.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {
    private final InterviewService interviewService;
    
    @PostMapping("/start")
    public ResponseEntity<Interview> startInterview(
            @RequestParam String topic,
            @RequestParam String difficulty,
            @RequestParam String userId) {
        return ResponseEntity.ok(interviewService.startInterview(topic, difficulty, userId));
    }
    
    @PostMapping("/{id}/evaluate")
    public ResponseEntity<Interview> evaluateResponse(
            @PathVariable Long id,
            @RequestBody String response) {
        return ResponseEntity.ok(interviewService.evaluateResponse(id, response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getInterview(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }
}
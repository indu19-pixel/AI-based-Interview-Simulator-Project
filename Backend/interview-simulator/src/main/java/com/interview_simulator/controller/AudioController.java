package com.interview_simulator.controller;


import com.interview_simulator.service.AudioService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/audio")
@RequiredArgsConstructor
public class AudioController {
    private final AudioService audioService;

    @PostMapping("/upload/{interviewId}")
    public ResponseEntity<String> uploadAudio(
            @PathVariable Long interviewId,
            @RequestParam("file") MultipartFile file) {
        try {
            String filePath = audioService.saveRecording(file, interviewId);
            return ResponseEntity.ok("Audio saved successfully: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to save audio: " + e.getMessage());
        }
    }
}

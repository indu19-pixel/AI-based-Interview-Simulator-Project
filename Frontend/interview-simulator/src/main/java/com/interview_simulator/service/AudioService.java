package com.interview_simulator.service;


import com.interview_simulator.model.Interview;
import com.interview_simulator.repository.InterviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AudioService {
    private static final String UPLOAD_DIR = "uploads/";
    private final InterviewRepository interviewRepository;

    public AudioService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public String saveRecording(MultipartFile audioFile, Long interviewId) throws IOException {
        if (audioFile.isEmpty()) {
            throw new IllegalArgumentException("Audio file is empty");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String filename = UUID.randomUUID().toString() + "_" + audioFile.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(audioFile.getInputStream(), filePath);

        // Update interview record with file path
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found"));
        interview.setAudioFilePath(filePath.toString());
        interviewRepository.save(interview);

        return filePath.toString();
    }
}

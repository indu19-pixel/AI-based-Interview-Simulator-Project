package com.interview_simulator.model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "interviews")
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Column(name = "topic", nullable = false, length = 100)
    private String topic;
    
    @Column(name = "difficulty", nullable = false, length = 50)
    private String difficulty;
    
    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;
    
    @Column(name = "user_response", columnDefinition = "TEXT")
    private String userResponse;
    
    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "audio_file_path", length = 255)
    private String audioFilePath;
}
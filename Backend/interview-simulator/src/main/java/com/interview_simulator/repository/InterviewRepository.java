package com.interview_simulator.repository;


import com.interview_simulator.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByUserId(String userId);
    List<Interview> findByUserIdAndTopic(String userId, String topic);
    List<Interview> findByUserIdAndDifficulty(String userId, String difficulty);
}
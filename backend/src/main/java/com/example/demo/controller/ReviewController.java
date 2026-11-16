package com.example.demo.controller;

import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("/model/{modelId}")
    public ResponseEntity<Map<String, Object>> getModelReviews(@PathVariable Long modelId) {
        List<Review> reviews = reviewRepository.findByModelIdOrderByCreatedAtDesc(modelId);
        double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        Map<String, Object> response = new HashMap<>();
        response.put("reviews", reviews);
        response.put("totalReviews", reviews.size());
        response.put("averageRating", Math.round(averageRating * 10.0) / 10.0);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addReview(@Valid @RequestBody Review review) {
        Review saved = reviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

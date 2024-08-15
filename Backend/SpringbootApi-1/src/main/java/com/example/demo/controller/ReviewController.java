package com.example.demo.controller;

import lombok.AllArgsConstructor;
import com.example.dto.ReviewDto;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/reviews")
@AllArgsConstructor
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto savedReview = reviewService.addReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReviewDto>> getReview(@PathVariable Long id) {
        List<ReviewDto> review = reviewService.getReview(id);
        return ResponseEntity.ok(review);
    }
     
    @GetMapping("/bookid")
    public ResponseEntity<List<ReviewDto>> getAllReviewsBook(
        @RequestParam(required = false) String bookId) {
        List<ReviewDto> reviews;
        if (bookId != null && !bookId.isEmpty()) {
            reviews = reviewService.getReviewsByBookId(bookId);
        } else {
            reviews = reviewService.getAllReviews();
        }
        return ResponseEntity.ok(reviews);
    }

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        List<ReviewDto> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDto> updateReview(@RequestBody ReviewDto reviewDto, @PathVariable Long id) {
        ReviewDto updatedReview = reviewService.updateReview(reviewDto, id);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}

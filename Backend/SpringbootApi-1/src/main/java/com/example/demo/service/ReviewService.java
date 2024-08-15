package com.example.demo.service;

import com.example.dto.ReviewDto;

import java.util.List;

public interface ReviewService {

    ReviewDto addReview(ReviewDto reviewDto);

    List<ReviewDto> getReview(Long id);

    List<ReviewDto> getAllReviews();

    ReviewDto updateReview(ReviewDto reviewDto, Long id);
     List<ReviewDto> getReviewsByBookId(String bookId);

    void deleteReview(Long id);
}

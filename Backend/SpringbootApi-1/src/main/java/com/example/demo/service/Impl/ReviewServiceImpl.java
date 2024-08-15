package com.example.demo.service.Impl;

import lombok.AllArgsConstructor;
import com.example.dto.ReviewDto;
import com.example.demo.entity.Review;
import com.example.demo.entity.entity;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.repository.ReviewRepo;
import com.example.demo.repository.repo;
import com.example.demo.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepo reviewRepository;
    private final repo userProfileRepository;

    @Override
    public ReviewDto addReview(ReviewDto reviewDto) {
        // Fetch the user from the repository
        entity user = userProfileRepository.findById(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = ReviewMapper.mapToReview(reviewDto,user);
        review.setUser(user); // Set the user for the review

        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(savedReview);
    }

    @Override
    public List<ReviewDto>getReview(Long id) {
    	return reviewRepository.findByUserId(id).stream()
                .map(ReviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
    }
     @Override
    public List<ReviewDto> getReviewsByBookId(String bookId) {
        // Logic to fetch reviews by bookId
        return reviewRepository.findByBookId(bookId).stream()
            .map(ReviewMapper::mapToReviewDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(ReviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto updateReview(ReviewDto reviewDto, Long id) {
        // Fetch the user from the repository
  entity user = userProfileRepository.findById(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setUser(user); // Set the user for the review
        review.setRating(reviewDto.getRating());
        review.setReviewText(reviewDto.getReviewText());

        Review updatedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(updatedReview);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}

package com.example.demo.mapper;

import com.example.demo.entity.Review;
import com.example.demo.entity.entity;
import com.example.dto.ReviewDto;

public class ReviewMapper {

	
	public static ReviewDto mapToReviewDto(Review review) {
		return new ReviewDto(
				review.getCreatedAt(),
				review.getBookId(),
				review.getId(),
				review.getRating(),
				review.getReviewText(),
				review.getUser().getId()
				);
	}
	   public static Review mapToReview(ReviewDto reviewDto, entity user) {
	        Review review = new Review();
	        review.setId(reviewDto.getId());
	        review.setCreatedAt(reviewDto.getCreatedAt());
	        review.setUser(user);  // Set the UserProfile object
	        review.setRating(reviewDto.getRating());
	        review.setReviewText(reviewDto.getReviewText());
	        review.setBookId(reviewDto.getBookId());
	        return review;
	    }
	
}

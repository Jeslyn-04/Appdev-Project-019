package com.example.demo.repository;

import com.example.demo.entity.Review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long> {
	List<Review> findByBookId(String bookId);
	List<Review> findByUserId(Long id);
}

package com.example.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

	private LocalDateTime createdAt;
	private String bookId;
    private Long id;
    private int rating;
    private String reviewText;
    private Long userId;
}

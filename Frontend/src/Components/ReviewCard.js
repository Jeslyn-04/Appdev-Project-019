import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ReviewCard.css'

const ReviewCard = ({ review, onEdit, onDelete, userId, ruid }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${review.userId}`);
        setUsername(response.data.name); // Adjust based on your API response structure
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [review.userId]);

  return (
    <div className="review-card bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-custom-violet">{review.bookTitle}</h3>
      </div>
      <p className="username" style={{ color: "blueviolet", fontSize: "18px" }}>{username}</p>
      <p className="review-text text-custom-black mt-2">{review.reviewText}</p>
      <div className="flex items-center mt-2" >
        <StarRating rating={review.rating} setRating={() => { }} />
        <span className="ml-2 text-custom-black">{review.rating}/5</span>
        {ruid === userId && (
          <div className="flex space-x-2 ml-auto" style={{marginLeft:"200px"}}>
            <button onClick={() => onEdit(review)} className="text-custom-blue hover:text-opacity-80">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => onDelete(review.id)} className="text-custom-orange hover:text-opacity-80" style={{ marginLeft: "20px" }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;

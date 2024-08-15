import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../Css/StarRating.css'

const StarRating = ({ rating, setRating }) => {
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={`cursor-pointer ${star <= rating ? 'text-custom-orange' : 'text-gray-300'}`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
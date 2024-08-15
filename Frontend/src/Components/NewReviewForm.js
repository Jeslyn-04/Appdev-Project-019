import React, { useState } from 'react';
import StarRating from './StarRating';
import '../Css/NewReviewForms.css'
import axios from 'axios';

const NewReviewForm = ({  onSubmit, bookId, userId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit =async (e) => {
    e.preventDefault();
    onSubmit({ reviewText, rating, bookId, userId });
    setReviewText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" id="rform">
      <h2 className="text-2xl font-bold mb-4 text-custom-violet" style={{fontFamily:"Cursive"}}>Express Your View</h2>
      <div className="mb-4">
      </div>
      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-custom-black mb-2">Your Review</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 border border-custom-beige rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-custom-black mb-2">Rating</label>
        
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <button type="submit" className="bg-custom-violet text-white px-4 py-2 rounded hover:bg-opacity-90 transition" style={{marginLeft:"300px"}}>
        Submit Review
      </button>
    </form>
  );
};

export default NewReviewForm;
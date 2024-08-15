import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import axios from 'axios';

const ReviewCard = ({ review, onEdit, onDelete, userId, ruid ,text}) => {
  const [username, setUsername] = useState('');
  const [booktitle, setBooktitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${review.bookId}?key=AIzaSyA1fDkSw5MpkFSePOvWcC_u1mlb5023H88`
        );
        setBooktitle(response.data.volumeInfo.title); // Extracting the book title
        console.log(response.data.volumeInfo.title);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [review.bookId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4" style={{ width: "450px" }}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-custom-violet" style={{ color: "#6a0dad" }}>{booktitle}</h3> {/* Displaying the book title */}
      </div>
      <div style={{ maxHeight: isExpanded ? 'none' : '50px', overflow: 'hidden', position: 'relative' }}>
        <p className="text-custom-black mt-2">{review.reviewText}</p>
        {!isExpanded && <div className="fade-effect" />} {/* Add fade effect for overflow */}
        <br />
        <div className="flex items-center mt-2">
        <StarRating rating={review.rating} setRating={() => { }} />
        <span className="ml-2 text-custom-black">{review.rating}/5</span>
        <div style={{ marginLeft: "200px" }}>
        {text !== 'home' && (
          <div className="flex space-x-2">
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
        </div>
        <button onClick={toggleExpand} className="text-custom-blue hover:text-opacity-80" style={{marginTop:"10px",marginLeft:"250px",borderRadius:"18px",padding:"5px",backgroundColor:"green",color:"white"}}>
        {isExpanded ? 'See Less' : 'See More'}
        </button>
    </div>
  );
};

export default ReviewCard;

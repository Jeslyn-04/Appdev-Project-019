import React, { useState } from "react";
import NewReviewForm from "../Components/NewReviewForm";
import ReviewCard from "../Components/ReviewCardProf";
import axios from "axios";
import UserContext from "./UserContext";
import { useEffect, useContext } from "react";
import StarRating from "./StarRating";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  const { user, setUser } = useContext(UserContext);
  // States for editing review
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const editReview = (reviewToEdit) => {
    setEditingReview(reviewToEdit);
    setEditedReviewText(reviewToEdit.reviewText);
    setEditedRating(reviewToEdit.rating);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reviews/${user.id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [user.id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/reviews/${editingReview.id}`,
        {
          ...editingReview,
          reviewText: editedReviewText,
          rating: editedRating,
        }
      );

      setReviews(
        reviews.map((review) =>
          review.id === response.data.id ? response.data : review
        )
      );
      setEditingReview(null); // Close the edit form
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-custom-vector bg-cover bg-center">
      <div className="container mx-auto py-8">
        <h1
          className="text-5xl font-bold text-center text-custom-violet "
          style={{ color: "aliceblue" }}
        >
          My Reviews
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {reviews.map((review) => (
              <ReviewCard 
                key={review.id}
                review={review}
                bookid={review.bookid}
                onEdit={editReview}
                onDelete={deleteReview}
              />
            ))}
            {reviews.length === 0 && (
              <p className="text-custom-black">
                You haven't posted any reviews yet.
              </p>
            )}
            {editingReview && (
              <div className="edit-review-form">
                <h3>Edit Review</h3>
                <form onSubmit={handleEditSubmit}>
                  <textarea
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                  />
                  <StarRating
                    rating={editedRating}
                    setRating={setEditedRating}
                  />
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <button type="submit">Update Review</button>
                    <button
                      type="button"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;

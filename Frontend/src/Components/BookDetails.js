import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Css/BookDetails.css";
import Navbar from "./Navbar";
import UserContext from "../Components/UserContext";
import NewReviewForm from "./NewReviewForm";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

const BookDetails = () => {
  const { bookId } = useParams(); // Extracts the book ID from the URL.
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState(null);
  const { user, setUser } = useContext(UserContext); // Retrieves the current user from context.
  const [showDialog, setShowDialog] = useState(false);
  const [useralreadynotreviewed, setUseralreadynotreviewed] = useState(false);

  // States for editing review
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  // Fetch book details when the component mounts or when bookId changes.
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyA1fDkSw5MpkFSePOvWcC_u1mlb5023H88`
        );
        setBook(response.data); // Set the fetched book data to state.
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Fetch reviews for the book when the component mounts or when bookId changes.
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reviews/bookid?bookId=${bookId}`
        );
        setReviews(response.data);
        const hasReviewed = response.data.some(
          (review) => review.userId === user.id
        );
        setUseralreadynotreviewed(!hasReviewed);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [bookId]);

  // Function to add a new review.
  const addReview = async (newReview) => {
    try {
      const response = await axios.post("http://localhost:8080/api/reviews", {
        ...newReview,
        createdAt: new Date(),
        userId: user.id, // Associate the review with the current user.
      });
      setReviews([...reviews, response.data]);
      setUseralreadynotreviewed(false);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  // Function to start editing an existing review.
  const editReview = (reviewToEdit) => {
    setEditingReview(reviewToEdit);
    setEditedReviewText(reviewToEdit.reviewText);
    setEditedRating(reviewToEdit.rating);
  };

  // Function to submit the edited review.
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
      setEditingReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  // Function to delete a review.
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId)); //
      setUseralreadynotreviewed(true);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Function to strip HTML tags and format the description text.
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Replace paragraph tags with double line breaks.
    const paragraphs = doc.body.querySelectorAll("p");
    paragraphs.forEach((p) => (p.outerHTML = p.innerText + "\n\n"));

    // Replace unordered and ordered list tags with single line breaks.
    const lists = doc.body.querySelectorAll("ul, ol");
    lists.forEach((list) => (list.outerHTML = "\n" + list.innerText + "\n"));

    // Replace list item tags with bullet points.
    const listItems = doc.body.querySelectorAll("li");
    listItems.forEach((li) => (li.outerHTML = "• " + li.innerText + "\n"));

    return doc.body.textContent || ""; // Return formatted text.
  };

  // Function to add the book to the user's "Want to Read" list.
  const handleAddToWantToRead = async () => {
    try {
      const updatedUser = {
        ...user,
        wanttoread: [...user.wanttoread, book.volumeInfo.title], // Add the book title to the list.
      };
      await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        updatedUser
      );
      setUser(updatedUser);
      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 2000);
    } catch (error) {
      console.error("Error updating want to read list:", error);
    }
  };

  // Function to add the book to the user's "Completed" list.
  const handleAddToReadBooks = async () => {
    try {
      const updatedUser = {
        ...user,
        completed: [...user.completed, book.volumeInfo.title], // Add the book title to the list.
      };
      await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        updatedUser
      );
      setUser(updatedUser);
      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 2000);
    } catch (error) {
      console.error("Error updating read books list:", error);
    }
  };

  // If book details are still being fetched, show a loading message.
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#486a59",
        backgroundPosition: "fixed",
      }}
    >
      <Navbar /> {/* Render the navigation bar */}
      <br />
      <div style={{ display: "flex" }}>
        <div className="book-details">
          <div style={{ display: "flex" }}>
            <div>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail} // Display the book thumbnail.
                alt={book.volumeInfo.title}
              />
            </div>
            <div style={{ textAlign: "justify" }} className="dets">
              <br></br>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "-10px",
                  fontWeight: "bolder",
                  fontFamily: "cursive",
                  color: "#fbfadb",
                }}
              >
                {book.volumeInfo.title} {/* Display the book title */}
              </h2>
              <br></br>
              <h3
                style={{
                  fontWeight: "600",
                  fontFamily: "cursive",
                  color: "aliceblue",
                }}
              >
                Authors: {book.volumeInfo.authors?.join(", ")}{" "}
                {/* Display authors */}
              </h3>
              <br></br>
              <h4
                style={{
                  fontWeight: "600",
                  fontFamily: "cursive",
                  color: "aliceblue",
                }}
              >
                Published Date: {book.volumeInfo.publishedDate}{" "}
                {/* Display published date */}
              </h4>
              <br></br>
              {book.volumeInfo.categories && (
                <>
                  <h4
                    style={{
                      fontWeight: "600",
                      fontFamily: "cursive",
                      textAlign: "justify",
                      color: "aliceblue",
                    }}
                  >
                    Genres:
                    <p style={{ paddingLeft: "10px" }}>
                      {" "}
                      {book.volumeInfo.categories?.join(", ")}
                    </p>{" "}
                    {/* Display genres */}
                  </h4>
                  <br></br>
                </>
              )}
              {book.volumeInfo.pageCount && (
                <>
                  <h4
                    style={{
                      fontWeight: "600",
                      fontFamily: "cursive",
                      color: "aliceblue",
                    }}
                  >
                    Page Count: {book.volumeInfo.pageCount}{" "}
                    {/* Display page count */}
                  </h4>
                  <br></br>
                </>
              )}
              {book.volumeInfo.averageRating && (
                <>
                  <h4
                    style={{
                      fontWeight: "600",
                      fontFamily: "cursive",
                      color: "aliceblue",
                    }}
                  >
                    Average Rating: {book.volumeInfo.averageRating}{" "}
                    {/* Display average rating */}
                  </h4>
                  <br></br>
                </>
              )}
              <br></br>
              <button
                onClick={handleAddToWantToRead} // Add book to "Want to Read" list.
                style={{
                  marginLeft: "30px",
                  borderRadius: "35px",
                  height: "40px",
                  width: "140px",
                  fontSize: "21px",
                  borderStyle: "none",
                  fontFamily: "cursive",
                  backgroundColor: "#fbfadb",
                }}
              >
                Read Next
              </button>
              <button
                onClick={handleAddToReadBooks} // Add book to "Completed" list.
                style={{
                  marginLeft: "20px",
                  borderRadius: "35px",
                  height: "40px",
                  width: "140px",
                  fontSize: "21px",
                  borderStyle: "none",
                  fontFamily: "cursive",
                  backgroundColor: "#fbfadb",
                }}
              >
                Completed
              </button>
            </div>
          </div>
          <div id="description">
            <h2
              style={{
                fontWeight: "500",
                fontFamily: "cursive",
                paddingTop: "10px",
                color: "#fbfadb",
              }}
            >
              Overview:
            </h2>
            <br />
            <p style={{ color: "aliceblue" }}>
              {stripHtmlTags(book.volumeInfo.description)}
            </p>{" "}
            {/* Display the book description */}
          </div>
        </div>
        <div id="review">
          {useralreadynotreviewed && (
            <div>
              <NewReviewForm
                onSubmit={addReview} // Submit a new review.
                bookId={bookId}
                userId={user.id}
              />
            </div>
          )}
          <br />
          <h2 style={{ fontFamily: "cursive", color: "#fbfadb" }}>Reviews</h2>
          <br />

          {reviews.length === 0 ? (
            <p style={{ color: "aliceblue" }}>No reviews posted yet</p>
          ) : (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review} // Pass each review to the ReviewCard component.
                onEdit={editReview} // Function to edit a review.
                onDelete={deleteReview} // Function to delete a review.
                userId={user.id}
                ruid={review.userId}
              />
            ))
          )}
          {editingReview && (
            <div className="edit-review-form">
              <h3>Edit Review</h3>
              <form onSubmit={handleEditSubmit}>
                {" "}
                {/* Form to edit review */}
                <textarea
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)} // Update edited text.
                />
                <StarRating rating={editedRating} setRating={setEditedRating} />{" "}
                {/* Rating component */}
                <br></br>
                <div style={{ display: "flex" }}>
                  <button type="submit">Update Review</button>{" "}
                  {/* Submit edited review */}
                  <button type="button" onClick={() => setEditingReview(null)}>
                    Cancel
                  </button>{" "}
                  {/* Cancel editing */}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {showDialog && (
        <div className="dialog-box">
          <p>Added to list</p> {/* Dialog box to confirm action */}
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2024 BookFanatic. All rights reserved.</p> {/* Footer */}
      </footer>
    </div>
  );
};

export default BookDetails; // Export the component for use in other parts of the app.

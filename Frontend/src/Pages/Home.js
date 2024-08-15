import React, { useState, useEffect } from "react";
import "../Css/Home.css";
import BookRecommendations from "../Components/BookRecommendations";
import Navbar from "../Components/Navbar";
import TypingEffect from "../Components/TypingEffect";
import axios from "axios";
import ReviewCard from "../Components/ReviewCardProf"; // Import the ReviewCard component
import UserContext from "../Components/UserContext";
import { useContext } from "react";

const Home = ({ text }) => {
  const { user, setUser } = useContext(UserContext);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]); // State for recent reviews

  // Typing effect for text
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Fetch recent reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reviews');
        const allReviews = response.data;

        // Sort reviews by creation date in descending order
        const sortedReviews = allReviews.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Store only the most recent 6 reviews
        const recentReviews = sortedReviews.slice(0, 6);
        setRecentReviews(recentReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const images = [
    {
      src: "/Images/Carosel/C1.jpg",
      caption: "First slide label",
      description:
        "PEN/Robert W. Bingham Prize for Debut Short Story Collection",
    },
    {
      src: "/Images/Carosel/C3.jpg",
      caption: "Second slide label",
      description: "International Booker Prize-Winner(2024)",
    },
    {
      src: "/Images/Carosel/C2.jpg",
      caption: "Third slide label",
      description: "PEN/Hemingway Award for Debut Novel",
    },
  ];

  // Handle edit and delete actions (these could be passed as props or handled here)
  const handleEditReview = (review) => {
    console.log("Edit review:", review);
    // Implement edit functionality here
  };

  const handleDeleteReview = (reviewId) => {
    console.log("Delete review:", reviewId);
    // Implement delete functionality here
  };

  return (
    <div style={{ height: "100%", backgroundColor: "#486a59" }}>
      <Navbar />
      <div style={{ display: "flex", marginLeft: "110px" }}>
        <div>
          <br></br> <br></br> <br></br> <br></br> <br></br>
          <TypingEffect text="Bookfanatic..." className="line1" /> <br></br>
          <TypingEffect text="Unlock a Treasure Trove of" className="line2" /> <br></br>
          <TypingEffect text="Must-Reads with Us !!!" className="line3" />
        </div>
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <img
                  src={image.src}
                  alt={image.caption}
                  className="carousel-img"
                />
                <div className="carousel-caption">
                  <h3 style={{ fontFamily: "Abuget" }}>{image.description}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => goToIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Display recent reviews using ReviewCard */}
      <div style={{ marginTop: "70px", marginLeft: "100px", color: "#fbfadb" }}>
        <h2 style={{fontSize:"30px"}}>Recent Reviews </h2><br/>
        <div
        style={{
           maxWidth: "100%", // Set a maximum width for the scrollable container
          overflowX: "scroll", // Enable horizontal scrolling
          // Prevent the content from wrapping to the next line
          paddingBottom: "10px", // Add padding to the bottom for better aesthetics
          marginRight: "100px", // Add padding to the bottom for better aesthetics
        scrollbarWidth: "none", // For Firefox: hide scrollbar
    msOverflowStyle: "none", // For Internet Explorer and Edge: hide scrollbar
        }}
      >
        {recentReviews.length > 0 ? (
          <div className="review-cards" style={{display:"flex",gap:"20px"}}>
            {recentReviews.map((review) => (
              <ReviewCard
                key={review._id}
                bookid={review.bookid}
                userId={user.id}
                ruid={review.userId}
                text={'home'}
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
              />
            ))}
          </div>
        ) : (
          <p>No recent reviews available.</p>
        )}
      </div>
      </div>
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#fbfadb',marginLeft:"80px",fontSize:"30px" }}>Recommended Books for This Week</h2>
        <br/>
        <BookRecommendations /> {/* Add the BookRecommendations component */}
      </div>
      <footer className="footer">
        <p>&copy; 2024 BookFanatic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

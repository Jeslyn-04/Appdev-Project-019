import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/BookList.css';

const BookRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const storedRecommendations = JSON.parse(localStorage.getItem('bookRecommendations'));
    const storedDate = localStorage.getItem('recommendationDate');
    const oneWeek =  7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentDate = new Date().getTime();

    if (storedRecommendations && storedDate && (currentDate - storedDate) < oneWeek) {
      setRecommendations(storedRecommendations);
    } else {
      generateNewRecommendations();
    }
  }, []);

  const generateNewRecommendations = async () => {
    try {
      // Predefined list of queries
      const queries = [
        'bestsellers',
        'popular+fiction',
        'new+releases+science+fiction',
        'top+rated+romance',
        'trending+mystery',
        'award+winning+historical+fiction',
        'upcoming+fantasy',
        'must+reads+biography',
        'critically+acclaimed+young+adult',
        'hot+children\'s+books'
      ];
      
      // Select a random query from the list
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${randomQuery}&maxResults=8&key=AIzaSyA1fDkSw5MpkFSePOvWcC_u1mlb5023H88`
      );
      
      const bookItems = response.data.items;
      if (!bookItems) {
        console.error('No book items found');
        return;
      }
  
      const newRecommendations = bookItems.map(item => {
        const volumeInfo = item.volumeInfo;
        return {
          id: item.id,
          title: volumeInfo.title,
          author: (volumeInfo.authors && volumeInfo.authors.length > 0) ? volumeInfo.authors[0] : 'Unknown',
          thumbnail: (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) ? volumeInfo.imageLinks.thumbnail : '',
        };
      });
  
      setRecommendations(newRecommendations);
      localStorage.setItem('bookRecommendations', JSON.stringify(newRecommendations));
      localStorage.setItem('recommendationDate', new Date().getTime());
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };
  
  

  return (
    <div
      style={{
        marginLeft:"80px",
        maxWidth: '100%',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        paddingBottom: '10px',
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer/Edge
        display: "flex",
      }}
      className="hide-scrollbar"
      
    >
      {recommendations.map((book) => (
        <div style={{display:"flex"}}>
        <Link
        key={book.id}
        to={`/book/${book.id}`}
        className="book-card"
        style={{ textDecoration: "none" }}
      >
          <img src={book.thumbnail} alt={book.title}  style={{objectFit:"cover"}}/>
          <div style={{ margin: "10px 0px 0px 10px" }}>
          <h3 style={{ color: 'aliceblue' }}>{book.title}</h3>
          </div>
          <p style={{
            textDecoration: "none",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#fbfadb",}}>{book.author}</p>
          </Link>
          </div>
          ))}
          </div>
  );
};

export default BookRecommendations;

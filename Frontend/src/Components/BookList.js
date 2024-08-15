import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

import bg from "../Images/Background/bg3-1.jpg";
import "../Css/BookList.css";

const BooksList = () => {
  const { genre, query } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchQuery = genre ? `subject:${genre}` : query;
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyA1fDkSw5MpkFSePOvWcC_u1mlb5023H88`
        );
        console.log("API Response:", response.data); // Log the API response
        setBooks(response.data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [genre, query]);

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#486a59",
        backgroundPosition: "fixed",
      }}
    >
      <Navbar />

      <h1
        style={{
          fontFamily: "sans-serief",
          textAlign: "center",
          textDecoration: "underline",
          color: "#fbfadb",
        }}
      >
        {genre ? `${genre} Books` : `Search Results for: ${query}`}
      </h1>
      <br />
      <div className="books-list">
        {books.length > 0 ? (
          books.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="book-card"
              style={{ textDecoration: "none" }}
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                loading="lazy"
              />
              <div style={{ margin: "10px 0px 0px 10px" }}>
                <p
                  style={{
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: "#fbfadb",
                  }}
                >
                  {book.volumeInfo.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading....</p>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 BookFanatic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BooksList;

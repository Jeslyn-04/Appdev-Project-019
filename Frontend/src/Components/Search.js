import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      history(`/search/${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="search-input"
      />
      <br></br>
      <button type="submit" className="search-button">Search</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </form>
  );
};

export default Search;

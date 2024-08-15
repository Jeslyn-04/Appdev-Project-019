import React, { useRef } from 'react';
import '../Css/BookScroll.css';

const BookScroll = ({ episodes }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="episode-scroll">
      <button className="scroll-control prev" onClick={scrollLeft}>&lt;</button>
      <div className="scroll-container" ref={scrollRef}>
        {episodes.map((episode, index) => (
          <div className="scroll-item" key={index}>
            <img src={episode.thumbnail} alt={episode.title} className="episode-img" />
            <div className="episode-info">
              <h4>{episode.title}</h4>
              <p>{episode.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-control next" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default BookScroll;

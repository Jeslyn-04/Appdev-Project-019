import React from 'react';
import '../Css/GenreGrid.css'; // Let's assume you have a CSS file for styling
import { Link } from 'react-router-dom';
const genres = [
    { title: 'Adventure', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOewshIjSIwQL7X0XxB7YIa0X3CLfxKEu4w&s' },
    { title: 'Mystery', image: 'https://images2.alphacoders.com/693/thumb-1920-693742.png' },
    { title: 'Literature', image: 'https://cache.desktopnexus.com/thumbseg/297/297830-bigthumbnail.jpg' },
    { title: 'History', image: 'https://wallpapercave.com/wp/wp2244335.jpg' },
    { title: 'Science', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbG4bazPHydl5CWXyMjpct7DaHgHN2Mhs9ET2azwZJSdKhy4ISkI0h9LYpK-IYYydw-A&usqp=CAU' },
  { title: 'Biographies', image: 'https://i.pinimg.com/originals/2d/85/60/2d8560968d2c829496643306e5b2de37.jpg' },
  { title: 'Thriller', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVtHjzsf64B4lFpZ95nssY6xElavrXIU7dQ&s' },
  { title: 'Magic', image: 'https://media.istockphoto.com/id/1353913402/vector/circus-magician-top-hat-and-magic-wand-trick.jpg?s=612x612&w=0&k=20&c=t7s79NoJC38OPNE6OHWKKKoY1tNbXz4Vw9a6vbKqoaU=' },
  { title: 'Poetry', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERptEQtAKD4udNastHFPks1R4grLF0wsD4g&s' },
  { title: 'Children', image: 'https://w0.peakpx.com/wallpaper/542/230/HD-wallpaper-cute-kids-in-spring-wheel-barrow-children-spring-cute-easter-summer-rabbits-flowers-bunnies-firefox-persona-theme-kids.jpg' },
  { title: 'Horror', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9d3cc34a-f5f2-4863-b04e-ef9e468713aa/dgu4if7-9d5f9ed1-f0e2-4c7a-8f7d-0bed409b9ac9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkM2NjMzRhLWY1ZjItNDg2My1iMDRlLWVmOWU0Njg3MTNhYVwvZGd1NGlmNy05ZDVmOWVkMS1mMGUyLTRjN2EtOGY3ZC0wYmVkNDA5YjlhYzkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WPLcm75bvDUxeBdlMeeZx98FJpWYQ4ABjY79G-EWEkc' },
  { title: 'Fantasy', image: 'https://w0.peakpx.com/wallpaper/219/939/HD-wallpaper-%E2%80%A2%E1%83%A6%E2%9C%BF%E1%83%A6%E2%80%A2-art-land-fantasy-fantasy-land.jpg' },
];

const GenreGrid = () => {
  return (
    <div className="genre-grid">
      {genres.map((genre) => (
     
        <Link to={`/books/${genre.title}`} className="genre-card">
      <img src={genre.image} alt={genre.title} className="genre-image" />
      <div className="genre-title">{genre.title}</div>
    </Link>
      ))}
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default GenreGrid;

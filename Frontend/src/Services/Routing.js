import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import Profile from '../Pages/Profile';
import Discover from '../Pages/Discover';
import Login from '../Pages/Login';
import SignUp from '../Pages/Signup';
import Genre from '../Pages/Genre';
import BookDetails from '../Components/BookDetails';
import '../App.css';
import BooksList from '../Components/BookList';
import { UserProvider } from '../Components/UserContext';
import EditProfile from '../Pages/EditProfile';
import withAuth from '../Services/Auth';


const ProtectedHome = withAuth(Home);
const ProtectedContact = withAuth(Contact);
const ProtectedBookDetails=withAuth(BookDetails);
const ProtectedBooksList=withAuth(BooksList);
const ProtectedDiscover=withAuth(Discover);
const ProtectedGenre=withAuth(Genre);
const ProtectedProfile=withAuth(Profile);
const ProtectedEditProfile=withAuth(EditProfile);


const Routing = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/home" element={<ProtectedHome text="Bookfanatic..." />} />
            <Route path="/contact" element={<ProtectedContact />} />
            <Route path="/discover" element={<ProtectedDiscover />} />
            <Route path="/profile/edit" element={<ProtectedEditProfile />} />
            <Route path="/genre" element={<ProtectedGenre />} />
            <Route path="/books/:genre" element={<ProtectedBooksList />} />
            <Route path="/search/:query" element={<ProtectedBooksList />} />
            <Route path="/book/:bookId" element={<ProtectedBookDetails />} />
            <Route path="/profile" element={<ProtectedProfile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default Routing;

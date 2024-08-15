import React from 'react'
import Search from '../Components/Search'
import bg from '../Images/Background/bg3-1.jpg'
import Navbar from '../Components/Navbar'
import TypingEffect from '../Components/TypingEffect'
import '../Css/Home.css';
import obs from '../Images/Background/Obsession.jpg'
export default function Discover() {
  return (
    <div id="discover"  style={{
      height: "100vh",
      backgroundColor: "#486a59",
      backgroundPosition: "fixed",
    }}>
    
   <Navbar/>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <TypingEffect text="Seeking your next book obsession?" className="line" /><br></br>
    <br></br>
    <Search/>

    <br></br>
    <footer className="footer">
    <p>&copy; 2024 BookFanatic. All rights reserved.</p>
  </footer>
    </div>
  )
}

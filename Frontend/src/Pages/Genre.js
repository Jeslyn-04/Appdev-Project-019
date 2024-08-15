import React from 'react'
import GenreGrid from '../Components/GenreGrid'
import Navbar from '../Components/Navbar'
import bg from '../Images/Background/bg3-1.jpg'

export default function Genre() {
  return (
    <div style={{
      backgroundColor: "#486a59",
      height: "100%",
    bachgroundPosition:"fixed",}}>
   
    <Navbar/>
    <br/>
    <GenreGrid />
    <br/>
    <br/>
    <footer className="footer">
    <p>&copy; 2024 BookFanatic. All rights reserved.</p>
  </footer>
    </div>
  )
}

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import '../Css/Contact.css';
import bg from '../Images/Background/bg3-1.jpg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/contact', formData);
      if (response.status === 200) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div  style={{
      height: "100%",
      backgroundColor: "#486a59",
      backgroundPosition: "fixed",}}>
      <Navbar/>
      <div className="contact-form">
      <h1 style={{fontFamily:"cursive",textAlign:"center",color:"#fbfadb",marginTop:"10px"}}>Write us anything...</h1>
      <br></br>
      <br></br>
      <div style={{display:"flex"}}>
      <div>
      <form onSubmit={handleSubmit} id="cform">
        <input 
        className='cinput'
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
        className='cinput'
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
        className='cinput'
          type="text" 
          name="subject" 
          placeholder="Subject" 
          value={formData.subject} 
          onChange={handleChange} 
          required 
        />
        <textarea 
        className='ctextarea'
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        ></textarea>
        <button type="submit" id="cbtn">Send Now</button>
      </form>
      </div>
      <div className="contact-info">
        <p>ADDRESS:</p>
        
        <p style={{margin:"10px 10px"}}>16, Lankaway, Florida, USA 99544</p>
        <p>PHONE:</p>
        <p style={{margin:"10px 10px"}}>123 456 7890</p>
        <p>EMAIL:</p>
        <p style={{margin:"10px 10px"}}>support@support.com</p>
        <div className="social-media">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-youtube"></i></a>
          <a href="#"><i className="fa fa-whatsapp"></i></a>
        </div>
      </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer className="footer">
      <p>&copy; 2024 BookFanatic. All rights reserved.</p>
    </footer>
    </div>
    </div>
  );
};

export default Contact;

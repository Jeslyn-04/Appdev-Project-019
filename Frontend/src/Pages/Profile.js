import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";
import Navbar from "../Components/Navbar";

import UserContext from "../Components/UserContext";
import bg from "../Images/Background/bg3-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import Myreview from "../Components/MyReviewsPage";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profile: "",
    completed: [],
    wanttoread: [],
    preferences: "",
  });

  const navigate = useNavigate();

  const profilePics = [
    "https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4395.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJaHeYG4xICUkfoSZ64kyD52AOo1ovGNvPN2s_jZH1ueMf2n8k9fkgDO8DfFtvTHnfZpM&usqp=CAU",
    "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
    "https://png.pngtree.com/png-clipart/20190516/original/pngtree-cute-girl-avatar-material-png-image_4023832.jpg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${user.id}`
        );
        const userData = userResponse.data;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          bio: userData.bio || "",
          profile: userData.profile || profilePics[0],
          completed: userData.completed || [],
          wanttoread: userData.wanttoread || [],
          preferences: userData.preference || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, profilePics, setUser]);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  const view = async (bookTitle) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&key=AIzaSyA1fDkSw5MpkFSePOvWcC_u1mlb5023H88`
      );
      const bookDetails = response.data.items[0];
      navigate(`/book/${bookDetails.id}`);
      console.log("Book details:", bookDetails);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleMarkAsCompleted = async (book) => {
    try {
      const updatedWantToRead = formData.wanttoread.filter(
        (item) => item !== book
      );
      const updatedCompleted = [...formData.completed, book];

      const updatedData = {
        ...user,
        completed: updatedCompleted,
        wanttoread: updatedWantToRead,
      };

      await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        updatedData
      );

      setFormData((prevData) => ({
        ...prevData,
        completed: updatedCompleted,
        wanttoread: updatedWantToRead,
      }));

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));

      console.log("Book marked as completed:", book);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleLogout=()=>{
    setUser("");
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/')
  }
  const handleProfilePicChange = (picUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      profile: picUrl,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div  style={{
      height: "100%",
      backgroundColor: "#486a59",
      backgroundPosition: "fixed",}} className="profpage">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div
            className="profile-info"
            style={{ display: "flex", fontFamily: "sans-serif" }}
          >
            <div style={{ marginLeft: "40px" }} className="inline">
              <img
                src={formData.profile}
                alt={`${formData.name}'s profile`}
                className="profile-pic"
              />
              <br />
              <br />

              <h2
                style={{
                  paddingRight: "50px",
                  textAlign: "center",
                  color:"#fbfadb"
                }}
              >
                {formData.name}
              </h2>
              <br></br>
              <h2 style={{ fontFamily: "sans-serif",color:"#fbfadb",fontSize:"24px" }}>ABOUT:</h2>
              <div style={{margin:"0px 15px",padding:"5px 0px"}}>
                <h3
                  style={{
                    paddingLeft: "10px",
                    paddingRight:"10px",
                    textAlign: "justify",
                    fontFamily: "sans-serif",
                    color:"aliceblue"
                  }}
                >
                  {formData.bio}
                </h3>
              </div>
                 <br/>
                <h3 style={{ fontFamily: "sans-serif",color:"#fbfadb",fontSize:"22px" }}>INTERESTS:</h3>
                <h3
                  style={{
                    paddingLeft: "28px",
                    paddingTop:"5px",
                    textAlign: "justify",
                    fontFamily: "sans-serif",
                    color:"aliceblue"
                  }}
                >
                  {formData.preferences}
                </h3>
              <br />
              <div style={{display:"flex"}}>
              <button
                onClick={handleEdit}
                style={{
                  marginLeft: "30px",
                  borderRadius: "35px",
                  height: "40px",
                  width: "140px",
                  fontSize: "21px",
                  borderStyle: "none",
                  fontFamily: "sans-serif",
                  backgroundColor:"white"
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "100px",
                  borderRadius: "35px",
                  height: "40px",
                  width: "140px",
                  fontSize: "21px",
                  borderStyle: "none",
                  fontFamily: "sans-serif",
                  color:'white',
                  backgroundColor:"#d73530"
                }}
              >
                Logout
              </button>
              </div>
            </div>
            <div style={{ marginLeft: "150px" }}>
              <br />
              <p>
                <strong style={{ fontFamily: "sans-serif", fontSize: "20px",color:"#fbfadb" }}>
                  Upcoming Reads:
                </strong>
              </p>
              <br></br>
              <div className="card-container">
                {formData.wanttoread.map((book, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <p>{book}</p>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        cursor: "pointer",
                        color: "grey",
                        fontSize: "23px",
                        marginLeft: "7px",
                        marginTop: "2px",
                      }}
                      onClick={() => view(book)}
                    />
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        cursor: "pointer",
                        color: "green",
                        fontSize: "21px",
                        marginLeft: "7px",
                        marginTop: "2px",
                      }}
                      onClick={() => handleMarkAsCompleted(book)}
                    />
                  </div>
                ))}
              </div>
              <br></br>
              <p>
                <strong style={{ fontFamily: "sans-serif", fontSize: "20px",color:"#fbfadb" }}>
                  Completed Reads:
                </strong>
              </p>
              <br></br>
              <div className="card-container">
                {formData.completed.map((book, index) => (
                  <div key={index} className="card">
                    <p>{book}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Myreview />
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Components/UserContext';

import bg from "../Images/Background/bg3-1.jpg";
import '../Css/EditProfile.css';

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profile: '',
    preferences: '',
  });

  const navigate = useNavigate();
  const profilePics = [
    'https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4395.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJaHeYG4xICUkfoSZ64kyD52AOo1ovGNvPN2s_jZH1ueMf2n8k9fkgDO8DfFtvTHnfZpM&usqp=CAU',
    'https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg',
    'https://png.pngtree.com/png-clipart/20190516/original/pngtree-cute-girl-avatar-material-png-image_4023832.jpg',
  ];
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio,
        profile: user.profile,
        preferences: user.preference,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProfilePicChange = (picUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      profile: picUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...user,
        name: formData.name,
        bio: formData.bio,
        profile: formData.profile,
        preference: formData.preferences,
      };
      await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedData);
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-profile-container"  style={{height:"100%",
      backgroundColor: "#486a59",}}>
    
      <div className="edit-profile-form">
        <h2 className="text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-input"
              placeholder="Enter your bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
              <label htmlFor="profile" className="form-label">
                Profile Picture
              </label>
              <div className="avatar-selection">
                {profilePics.map((pic, index) => (
                  <img
                    key={index}
                    src={pic}
                    alt={`Avatar ${index}`}
                    className={`avatar-pic ${formData.profile === pic ? 'selected' : ''}`}
                    onClick={() => handleProfilePicChange(pic)}
                  />
                ))}
              </div>
            </div>
          <div className="form-group">
            <label htmlFor="preferences" className="form-label">
              Preferences
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/profile')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

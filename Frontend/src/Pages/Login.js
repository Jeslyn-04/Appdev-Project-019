import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Components/UserContext";
import Button from "@mui/material/Button";
import logo from "../Images/Logo/Logobook.jpg";
import bg from "../Images/Background/lobg.jpg";
import "../Css/Signin.css";
import { getalluser } from "../Services/service";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const { setUser: setUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const updateemail = (e) => {
    setUser({ ...user, email: e.target.value });
    setIsValidEmail(validateEmail(e.target.value));
    setErrorMessage(""); // Clear error message when typing
  };

  const updatepassword = (e) => {
    setUser({ ...user, password: e.target.value });
    setErrorMessage(""); // Clear error message when typing
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkUser = async (email, password) => {
    const response = await getalluser();
    return response.data.some(
      (user) => user.email === email && user.password === password
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Check if email or password is empty
    if (!user.email || !user.password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const userExist = await checkUser(user.email, user.password);
    const response = await getalluser();

    if (userExist) {
      const userData = response.data.find(
        (users) => user.email === users.email
      );
      setUserContext(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home", { replace: true });
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div
      id="Log"
      style={{
        height: "100vh",
        backgroundColor: "#486a59",
      }}
    >
      <div className="wrapper">
        <div className="Logoimg">
          <img
            src={logo}
            height={"220px"}
            width={"250px"}
            style={{ marginLeft: "20px" }}
          />
        </div>
        <form>
          <h1 style={{ fontFamily: "serif" }}>SIGN IN</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email Address"
              value={user.email}
              onChange={updateemail}
              className="email"
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={updatepassword}
              className="email"
            />
          </div>
          <button type="submit" className="btn" onClick={handleLogin}>
            Login
          </button>

          {/* Error message display */}
          {errorMessage && <p style={{ color: "red",textAlign:"center" }}>{errorMessage}</p>}

          <div className="register-link">
            <p>
              Don't have an account?
              <br />
              <Link style={{ color: "black" }} to="/signup">
                <p>Sign Up</p>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

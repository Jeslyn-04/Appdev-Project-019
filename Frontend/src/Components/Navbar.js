import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../Css/Navbar.css";
import logo from "../Images/Logo/logofinal.png";
import UserContext from "../Components/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-link"
              >
                <div>
                  <img
                    src={logo}
                    height={"100px"}
                    width={"260px"}
                    style={{ marginLeft: "50px" }}
                  />
                </div>
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "150px" }}>
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/discover"
                activeClassName="active"
                className="nav-link"
              >
                Discover
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/genre"
                activeClassName="active"
                className="nav-link"
              >
                Genre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                activeClassName="active"
                className="nav-link"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              {user && (
                <NavLink
                  to="/profile"
                  activeClassName="active"
                  className="nav-link"
                >
                  {user.name}
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="nav-item profile-icon"
                  />
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

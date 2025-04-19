import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import "../css/Navbar.css"; // Ensure you have the CSS for styles

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username"); // Get the username from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check if the user is authenticated

  const handleToggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility for mobile responsiveness
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication status
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("role"); // Optionally remove role as well
    navigate("/"); // Redirect to homepage ("/") after logout
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <h1 className="logo">TEAM BLAZE</h1>
      </div>

      {/* Center Section */}
      <div className={`center-section ${showMenu ? "show-menu" : ""}`}>
        <ul className={`nav-list ${showMenu ? "show-menu" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/acc" className="nav-link">
              Rooms
            </Link>
          </li>

          {/*<li className="nav-item">
            <Link to="/booking" className="nav-link">
              Booking
            </Link>
          </li>*/}
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
    

        <li className="nav-item">
            <Link to="/mybookings" className="nav-link">
              MyBookings
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section - Sign In, Sign Up, or Profile */}
      <div className="right-section">
        <ul className={`nav-list ${showMenu ? "show-menu" : ""}`}>
          {isAuthenticated && username ? (
            // If user is logged in, show their username and profile icon
            <li className="nav-item">
              <div className="profile-info">
                <FaUserCircle style={{ marginRight: 8, fontSize: "1.5rem" }} />
                <span className="username">{username}</span>
              </div>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaSignInAlt style={{ marginRight: 8 }} />
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FaUserPlus style={{ marginRight: 6 }} />
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            // If logged in, show a logout button
            <li className="nav-item">
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="menu-icon" onClick={handleToggleMenu}>
          <FiMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Logo.jpeg";
import authService from "../../services/authservice";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      authService.logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <span>TasaQue</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li>
            <button className="nav-btn" onClick={handleAuthAction}>
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
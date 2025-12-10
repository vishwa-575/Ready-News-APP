import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Brand */}
      <Link className="navbar-brand" to="/">
        Ready News
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-btn" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-btn" to="/add">
              Add News
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-btn" to="/news">
              My News
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-btn" to="/live">
              Live News
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-btn" to="/about">
              About
            </Link>
          </li>

        

          <li className="nav-item">
  <button
    className="nav-btn"
    onClick={() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
</li>


          {/* 🌙 / ☀️ Theme Toggle */}
          <li className="nav-item ms-3">
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

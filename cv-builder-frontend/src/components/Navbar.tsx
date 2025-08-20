import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CV Builder
        </Link>
        <div className="navbar-menu">
          <Link to="/templates" className="navbar-link">
            Templates
          </Link>
          <Link to="/builder" className="navbar-link">
            Create Resume
          </Link>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link navbar-link-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import '../css/Header.css'; // Import the CSS file

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle smooth scrolling
  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="logo">Logo</div>

      {/* Navigation Links for Desktop */}
      <div className="nav-links">
        <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
        <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
        <a href="#plan" onClick={(e) => handleScroll(e, 'plan')}>Plan</a>
        <a href="#level" onClick={(e) => handleScroll(e, 'level')}>Level</a>
        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
        <a href="#download" onClick={(e) => handleScroll(e, 'download')}>Download</a>
      </div>

      {/* Login Button for Desktop */}
      <div className="login-btn">Login</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
        <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
        <a href="#plan" onClick={(e) => handleScroll(e, 'plan')}>Plan</a>
        <a href="#level" onClick={(e) => handleScroll(e, 'level')}>Level</a>
        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
        <a href="#download" onClick={(e) => handleScroll(e, 'download')}>Download</a>
      </div>
    </div>
  );
}

export default Header;

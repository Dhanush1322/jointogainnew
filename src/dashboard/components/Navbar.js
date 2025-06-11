import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };
  // ✅ Logout function - Remove token & Redirect
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_name");
    localStorage.removeItem("_id");
    localStorage.removeItem("user_id");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <h3>User Dashboard</h3>

      <div className="navbar-profile" onClick={handleProfileClick}>
        <FaUserCircle className="profile-icon" />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => navigate('/EditProfile')}>My Profile</div>
            <div className="dropdown-item" onClick={handleLogout}>Sign Out</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

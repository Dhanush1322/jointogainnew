import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChnagePasswodForm from '../components/ChnagePasswodForm';
import './DashboardPage.css';

function ChangePassword() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
    
      // ✅ Check if the token is missing and redirect to login
      useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/"); // Redirect to login if no token
        }
      }, [navigate]);
    
      // ✅ Logout function - Remove token & Redirect
      const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user_name");
        localStorage.removeItem("_id");
        localStorage.removeItem("user_id");
        navigate("/"); // Redirect to login page
      };
    
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* ✅ Pass handleLogout to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} handleLogout={handleLogout} />
      <div className="dashboard-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <ChnagePasswodForm />
      </div>
    </div>
  )
}

export default ChangePassword
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import './DashboardPage.css';
import KycForm from '../components/KycForm';
import MyKycList from '../components/MyKycList';

function Kyc() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  // Update windowWidth state on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute marginLeft based on window width
  const marginLeft = windowWidth <= 768 ? '4px' : '260px';
  return (
    <div className="dashboard">
      {/* ✅ Pass handleLogout to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} handleLogout={handleLogout} />
      <div className="dashboard-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ marginTop: '100px', marginLeft }}>
          <KycForm />
          <MyKycList />
        </div>
      </div>
    </div>

  )
}

export default Kyc
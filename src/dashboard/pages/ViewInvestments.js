import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './DashboardPage.css';
import ViewInvestmentsTable from '../components/ViewInvestmentsTable';

function ViewInvestments() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get the referral user ID from URL

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/"); // Redirect to login if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_name");
    localStorage.removeItem("_id");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const marginLeft = windowWidth <= 768 ? '4px' : '260px';

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} handleLogout={handleLogout} />
      <div className="dashboard-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ marginTop: '100px', marginLeft }}>
          {/* ✅ Pass the ID as a prop */}
          <ViewInvestmentsTable userId={id} />
        </div>
      </div>
    </div>
  );
}

export default ViewInvestments;

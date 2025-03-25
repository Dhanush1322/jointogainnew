import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import './DashboardPage.css';

import AddNewMemberForm from '../components/AddNewMemberForm';

function AddNewMember() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
  
  
    // ✅ Logout function - Remove token & Redirect
    const handleLogout = () => {
      localStorage.removeItem("authToken"); // Remove token
      navigate("/admin"); // Redirect to login page
    };
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
  return (
    <div className="dashboard" >
      {/* ✅ Pass handleLogout to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} handleLogout={handleLogout} />
      <div className="dashboard-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <AddNewMemberForm />
      </div>
    </div>
  )
}

export default AddNewMember
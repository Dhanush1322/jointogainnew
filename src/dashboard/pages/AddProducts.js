import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function AddProducts() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate=useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="dashboard-content">
        <Navbar toggleSidebar={toggleSidebar} />
       
        <AddProductForm/>
      </div>

    </div>
  )
}

export default AddProducts
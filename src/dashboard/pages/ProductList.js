import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import ProductListTable from '../components/ProductListTable';

function ProductList() {
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
          <ProductListTable/>
        </div>
      </div>
    );
  };

export default ProductList
import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import OrderListTable from '../components/OrderListTable';

function OrderList() {
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
      <OrderListTable/>
    </div>
  </div>
  )
}

export default OrderList
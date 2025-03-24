import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import ApproveOrderlistTable from '../components/ApproveOrderlistTable';

function ApprovedOrder() {
    const [searchQuery, setSearchQuery] = useState('');
        const [orders, setOrders] = useState([
            { 
                id: 1, 
                name: 'John Doe', 
                address: '123 Street, City, State', 
                contact: '9876543210', 
                product: 'Smartphone', 
                price: '50000', 
                quantity: 2, 
                image: 'https://via.placeholder.com/50', 
                status: 'Approved',
                deliveryStatus: 'Not Delivered' 
            },
            { 
                id: 2, 
                name: 'Jane Smith', 
                address: '456 Avenue, City, State', 
                contact: '8765432109', 
                product: 'Laptop', 
                price: '75000', 
                quantity: 1, 
                image: 'https://via.placeholder.com/50', 
                status: 'Approved',
                deliveryStatus: 'Not Delivered' 
            }
        ]);
    
        const toggleDeliveryStatus = (id) => {
            setOrders(orders.map(order => 
                order.id === id 
                    ? { ...order, deliveryStatus: order.deliveryStatus === 'Not Delivered' ? 'Delivered' : 'Not Delivered' } 
                    : order
            ));
        };
        
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
      <ApproveOrderlistTable/>
    </div>
  </div>
  )
}

export default ApprovedOrder
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Box, List, LogOut, CheckCircle, Truck, XCircle, Edit, Eye } from 'lucide-react';
import './Sidebar.css';
import Logo from '../logo/logoo.png';

const Sidebar = ({  handleLogout, isOpen}) => {
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogoutClick = () => {
    setLoading(true);
    setTimeout(() => {
      handleLogout();
      setLoading(false);
    }, 2000);
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>

      <img src={Logo} alt="Logo" width="80" className="sidebar-logo" />
      <hr className="sidebar-divider" />
      <li className="sidebar-item"><Link to="/Dashboard"><User size={20} />Dashboard</Link></li>
      <hr className="sidebar-divider" />
      <ul className="sidebar-menu">
        
        <li className="sidebar-item" onClick={() => toggleMenu('profile')}>
          <div className="sidebar-link">
            <Home size={20} /> <span>Profile Kit</span>
          </div>
          {activeMenu === 'profile' && (
            <ul className="submenu">
              <li className="submenu-item"><Link to="/EditProfile"><Edit size={18} /> Edit Profile</Link></li>
              <li className="submenu-item"><Link to="/change-password"><Eye size={18} /> Change Password</Link></li>
            </ul>
          )}
        </li>
        <hr className="sidebar-divider" />
        
        <li className="sidebar-item"><Link to="/KYC"><User size={20} /> KYC</Link></li>
        <hr className="sidebar-divider" />
        
        <li className="sidebar-item" onClick={() => toggleMenu('team')}>
          <div className="sidebar-link">
            <Home size={20} /> <span>My Team</span>
          </div>
          {activeMenu === 'team' && (
            <ul className="submenu">
              <li className="submenu-item"><Link to="/AddMember"><Edit size={18} /> Add New Member</Link></li>
              <li className="submenu-item"><Link to="/ViewMatrix"><Eye size={18} /> View Matrix</Link></li>
              <li className="submenu-item"><Link to="/Downline"><Eye size={18} /> Downline Member</Link></li>
            </ul>
          )}
        </li>
        <hr className="sidebar-divider" />
        
        <li className="sidebar-item" onClick={() => toggleMenu('account')}>
          <div className="sidebar-link">
            <Home size={20} /> <span>Account</span>
          </div>
          {activeMenu === 'account' && (
            <ul className="submenu">
              <li className="submenu-item"><Link to="/Transactions"><Edit size={18} /> Account Transaction</Link></li>
              <li className="submenu-item"><Link to="/WithdrawDetails"><Eye size={18} /> Withdraw Details</Link></li>
            </ul>
          )}
        </li>
        <hr className="sidebar-divider" />
        
        <li className="sidebar-item" onClick={() => toggleMenu('investments')}>
          <div className="sidebar-link">
            <Home size={20} /> <span>Investments</span>
          </div>
          {activeMenu === 'investments' && (
            <ul className="submenu">
              <li className="submenu-item"><Link to="/ReTopup"><Edit size={18} /> Re Topup</Link></li>
              <li className="submenu-item"><Link to="/MyInvestment"><Eye size={18} /> My Investment</Link></li>
            </ul>
          )}
        </li>
        <hr className="sidebar-divider" />
        
        <li className="sidebar-item" onClick={handleLogoutClick}>
          <div className="sidebar-link logout">
            <LogOut size={20} /> <span>{loading ? "Logging out..." : "Logout"}</span>
          </div>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    </div>
  );
};

export default Sidebar;

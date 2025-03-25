import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import DashboardPage from "./dashboard/pages/DashboardPage";

import EditProfile from "./dashboard/pages/EditProfile";
import Kyc from "./dashboard/pages/Kyc";
import ChangePassword from "./dashboard/pages/ChangePassword";
import AddNewMember from "./dashboard/pages/AddNewMember";
import ViewMatrix from "./dashboard/pages/ViewMatrix";
import Dowline from "./dashboard/pages/Dowline";
import AccountTransaction from "./dashboard/pages/AccountTransaction";
import WithdrawDetails from "./dashboard/pages/WithdrawDetails";
import ReTopUp from "./dashboard/pages/ReTopUp";
import MyInvestments from "./dashboard/pages/MyInvestments";
const App = () => {
  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/Kyc" element={<Kyc />} />
          <Route path="/AddNewMember" element={<AddNewMember />} />
          <Route path="/ViewMatrix" element={<ViewMatrix />} />
          <Route path="/Dowline" element={<Dowline />} />
          <Route path="/AccountTransaction" element={<AccountTransaction />} />
          <Route path="/WithdrawDetails" element={<WithdrawDetails />} />
          <Route path="/ReTopUp" element={<ReTopUp />} />
          <Route path="/MyInvestments" element={<MyInvestments />} />
        </Routes>
       
      </Router>
    </div>
  );
};

export default App;

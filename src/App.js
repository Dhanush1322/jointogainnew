import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";
import DashboardPage from "./dashboard/pages/DashboardPage";
import ActiveUser from "./dashboard/pages/ActiveUser";
import AddProducts from "./dashboard/pages/AddProducts";
import ProductList from "./dashboard/pages/ProductList";
import OrderList from "./dashboard/pages/OrderList";
import EditProfile from "./dashboard/pages/EditProfile";

import ChangePassword from "./dashboard/pages/ChangePassword";

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
          <Route path="/user-list" element={<ActiveUser />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/order-list" element={<OrderList />} />
         
        </Routes>
       
      </Router>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import '../css/Header.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert
import { useNavigate } from 'react-router-dom'; // For navigation

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle smooth scrolling
  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleLogin = async () => {
    const loginData = {
      user_profile_id: userId,
      password: password
    };
  
    try {
      const response = await fetch('http://jointogain.ap-1.evennode.com/api/user/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
  
      const data = await response.json();
  
      if (data.status) {
        // Store token, user_id, name, and the additional _id in localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user_id', userId); // Profile ID
        localStorage.setItem('user_name', data.data.name); // Store user name
        localStorage.setItem('_id', data.data._id); // Store additional user ID
  
        // Show success message with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Click OK to continue to the dashboard.',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/dashboard'); // Redirect after clicking OK
        });
      } else {
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: data.message || 'Invalid credentials, please try again.'
        });
      }
    } catch (error) {
      // Show network error
      Swal.fire({
        icon: 'error',
        title: 'Login Error!',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };
  
  return (
    <div className="header">
      {/* Logo Section */}
      <div className="logo">
  <img src="/img/logoo.png" alt="Logo" style={{ height: "100px" }} />
</div>


      {/* Navigation Links for Desktop */}
      <div className="nav-links">
        {['home', 'about', 'plan', 'level', 'contact', 'download'].map((section) => (
          <a key={section} href={`#${section}`} onClick={(e) => handleScroll(e, section)}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      {/* Login Button for Desktop */}
      <div className="login-btn" onClick={() => setLoginOpen(true)}>Login</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
{/* Mobile Menu with Login Link */}
<div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
  {['home', 'about', 'plan', 'level', 'contact', 'download'].map((section) => (
    <a key={section} href={`#${section}`} onClick={(e) => handleScroll(e, section)}>
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </a>
  ))}
  <a onClick={() => { setLoginOpen(true); setMenuOpen(false); }} style={{ cursor: 'pointer' }}>
    Login
  </a>
</div>


      {/* Login Popup */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            margin="dense"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleLogin} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;

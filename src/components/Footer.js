import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>

        {/* Left Section */}
        <div style={leftSectionStyle} className="footer-left">
          <div style={logoContainerStyle}>
          <img src="/img/logoo.png" alt="Logo" style={{ height: "100px" }} />
            <h2>Join To Gain</h2>
          </div>
          <p style={copyrightStyle}>
            Copyright © 2025 JOIN 2 GAIN<br />
            All rights reserved
          </p>
          <div style={socialContainerStyle}>
            <a href="#" style={iconStyle}><i className="fab fa-facebook"></i></a>
            <a href="#" style={iconStyle}><i className="fab fa-instagram"></i></a>
            <a href="#" style={iconStyle}><i className="fab fa-twitter"></i></a>
            <a href="#" style={iconStyle}><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Right Section - No Change in Desktop */}
        <div style={rightSectionStyle} className="footer-right">

          {/* Company */}
          <div>
            <h2>Company</h2>
            <ul style={listStyle}>
              <li style={listItemStyle}>Home</li>
              <li style={listItemStyle}>About</li>
              <li style={listItemStyle}>Plans</li>
              <li style={listItemStyle}>Levels</li>
              <li style={listItemStyle}>Contact Us</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2>Support</h2>
            <ul style={listStyle}>
              <li style={listItemStyle}>Help Center</li>
              <li style={listItemStyle}>Terms of Service</li>
              <li style={listItemStyle}>Legal</li>
              <li style={listItemStyle}>Privacy Policy</li>
              <li style={listItemStyle}>Status</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="button-subscrib" style={subscribeSectionStyle}>
            <h2>Stay Updated</h2>
            <input type="email" placeholder="Your email address" style={inputStyle} />
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Mobile Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .footer-right {
              flex-direction: column;
              align-items: flex-start;
              width: 100%;
            }

            .footer-left {
              width: 100%;
              text-align: left;
            }

            .footer-right div {
              margin-bottom: 20px;
            }

            .social-container {
              justify-content: flex-start;
            }

            .subscribe-section input,
            .subscribe-section button {
              width: 100%;
            }
           
          }
        `}
      </style>
    </footer>
  );
}

// Styles (No Changes in Large Screen)
const footerStyle = {
  backgroundColor: '#263238',
  color: '#fff',
  padding: '40px 20px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: 'auto'
};

const leftSectionStyle = {
  flex: '1',
  minWidth: '300px',
  marginBottom: '20px'
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const logoStyle = {
  width: '50px'
};

const copyrightStyle = {
  margin: '10px 0',
  lineHeight: '1.5'
};

const socialContainerStyle = {
  display: 'flex',
  gap: '10px'
};

const iconStyle = {
  fontSize: '24px',
  color: '#fff',
  textDecoration: 'none'
};

const rightSectionStyle = {
  flex: '2',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  minWidth: '600px'
};

const listStyle = {
  listStyle: 'none',
  padding: 0
};

const listItemStyle = {
  marginBottom: '10px'
};

const subscribeSectionStyle = {
  width: '100%',
  maxWidth: '400px'
};

const inputStyle = {
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: 'none'
};

const buttonStyle = {
  marginTop: '10px',
  padding: '10px',
  width: '100%',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#D9D9D9',
  color: 'black',
  cursor: 'pointer'
  
};

export default Footer;

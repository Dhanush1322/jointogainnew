import React from 'react';
import ContactForm from '../components/ContactForm';

function ContactUs() {
  return (
    <div id='contact' style={{ textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <div 
        style={{ 
          backgroundImage: "url('/img/pexels-photo-821754 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: '100%',  
          minHeight: '550px', // Allows height to adjust based on content
          margin: '20px auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <h2 style={{ fontSize: '40px', padding: '10px' }}>Get in Touch</h2>
      </div>
      
      <ContactForm/>

      {/* 🔹 Mobile Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            #contact div {
              background-size: contain !important;  /* Ensures full image visibility */
              min-height: 350px !important; /* Adjusts height for small screens */
            }
            #contact h2 {
              font-size: 28px !important; /* Reduces text size for mobile */
              padding: 5px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ContactUs;

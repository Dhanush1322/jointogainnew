import React from 'react';

function ContactForm() {
  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Let's Answer Your Query</h2>
      
      <div style={containerStyle}>
        {/* Contact Information */}
        <div style={boxStyle}>
          <h3>Contact Information</h3>
          <p><strong>📞 Contact Number:</strong> +91 98765 43210</p>
          <p><strong>📧 Email ID:</strong> example@email.com</p>
          <p><strong>📍 Address:</strong> 123, XYZ Street, Bengaluru, India</p>
        </div>

        {/* Form Section */}
        <div style={formBoxStyle}>
          <form style={formStyle}>
            <input type="text" placeholder="Your Name" style={inputStyle} required />
            <input type="email" placeholder="Email ID" style={inputStyle} required />
            <input type="tel" placeholder="Phone Number" style={inputStyle} required />
            <textarea placeholder="Enter your message" style={{ ...inputStyle, height: '100px' }} required></textarea>
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>

        {/* Location (Google Maps) */}
        <div style={mapBoxStyle}>
          <h3>Our Location</h3>
          <iframe 
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6024731603536!2d77.59456241524837!3d12.971598590859024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b9d8e6df%3A0xa0c6f3c4f7c933f0!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1632424099281!5m2!1sen!2sin" 
            width="100%" 
            height="200" 
            style={iframeStyle}
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* 🔹 Mobile Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .contact-container {
              flex-direction: column !important;
              gap: 20px !important;
            }
            .contact-box {
              width: 100% !important;
            }
            .contact-form-box {
              max-width: 100% !important;
            }
            .contact-map {
              width: 100% !important;
            }
          }
        `}
      </style>
    </section>
  );
}

// Common Styles
const sectionStyle = {
  textAlign: 'center',
  padding: '50px',
};

const headingStyle = {
  fontSize: '28px',
  marginBottom: '20px',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: '30px',
};

const boxStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'left',
  maxWidth: '350px',
  width: '100%',
};

const formBoxStyle = {
  ...boxStyle,
  maxWidth: '500px',
  width: '100%',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '19px',
  cursor: 'pointer',
};

const mapBoxStyle = {
  ...boxStyle,
  width: '300px',
};

const iframeStyle = {
  border: '0',
  borderRadius: '10px',
};

export default ContactForm;

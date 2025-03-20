import React from 'react';
import '../css/Plans.css'; // Import CSS for styling
import planImage from '../img/plan.png'; // Import image
import plan1Image from '../img/plan1.png'; // Import image
function Plans() {
  return (
    <section id='plan' className="plans-container">
       {/* Heading Section */}
       <h1 className="plan-heading">Plan</h1>
     
      <div className="plans-content">
        {/* Left Section */}
        <div className="plans-details">
          <h3>Monthly Income Plan</h3>
          <ul>
            <li><strong>Investment Amount:</strong> ₹1 Lakh</li>
            <li><strong>Monthly Payout:</strong> ₹10,000</li>
            <li>₹5,000 returns + ₹5,000 capital</li>
            <li><strong>Deductions:</strong></li>
            <li>TDS: 10% (only on returns)</li>
            <li>Service Charge: 2% (only on returns)</li>
          </ul>
          <button className="download-btn">Download API</button>
        </div>

        {/* Right Section */}
        <div className="plans-image">
          <img src={planImage} alt="Plan Illustration" />
        </div>
      </div>
      <div className="stability-plans-content">
        {/* Right Section */}
        <div className="stability-plans-image">
          <img src={plan1Image} alt="Plan Illustration" />
        </div>
        {/* Left Section */}
        <div className="stability-plans-details">
          <h3>Long-Term Stability Plan</h3>
          <ul>
            <li><strong>Investment Amount:</strong>  ₹1 Lakh</li>
            <li><strong>Monthly Payout: </strong> ₹10,000</li>
            <li>₹5,000 returns + ₹5,000 capital</li>
            <li><strong>Deductions:</strong></li>
            <li>TDS: 10% (only on returns)</li>
            <li>Service Charge: 2% (only on returns)</li>
          </ul>
          <button className="download-btn">Download API</button>
        </div>

        
      </div>
    </section>
  );
}

export default Plans;

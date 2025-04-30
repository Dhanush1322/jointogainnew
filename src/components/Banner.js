import React from 'react';
import '../css/Banner.css'; // Import the CSS file
import myImage from '../img/Stock trading statistics on computer screen.png';
function Banner() {
  return (
    <section id='home' className="banner-container">
      <div className="banner-wrapper">
        {/* Text Content */}
        <div className="banner-text">
          <h1>Welcome to Join2Gain </h1>
          <h2> Join - Refer - Earn</h2>
          <p>
            Join2Gain empowers investors by unlocking the potential of real asset investments. 
            These assets provide stability, predictable income, and a natural hedge against inflation—
            making them a crucial component of a well-diversified portfolio.
          </p>
          <p>
            For decades, institutional investors have leveraged real assets to enhance returns 
            and mitigate risk. However, individual investors often struggle to access these opportunities 
            due to complexity and high entry barriers. At Join2Gain, we break down these barriers by 
            simplifying sophisticated investment strategies, ensuring that fiduciary advisers and their 
            clients can easily integrate real assets into their portfolios.
          </p>
          <p>
            We are more than just an investment platform—we are your trusted partner in wealth-building. 
            Our expert-driven insights, educational resources, and innovative financial tools empower you 
            to make informed decisions with confidence.
          </p>
          <p>
            Our mission is to provide you with the knowledge, strategies, and support you need to achieve 
            financial independence and excel in your trading journey. With Join2Gain, you're not just 
            investing; you're building a path to long-term success.
          </p>
        </div>

        {/* Image Section */}
        <div className="banner-image">
          <img src={myImage} alt="Join2Gain Investment" />
        </div>
      </div>
    </section>
  );
}

export default Banner;

import React from 'react';
import '../css/About.css'; // Import CSS file for styling
import { FaUsers, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa'; // Import icons
import Rectanguler from '../img/Rectangle 159.png';
import icon from '../img/Icon.png';
import icon1 from '../img/Icon1.png';
import icon2 from '../img/Icon2.png';

function About() {
  return (
    <>
    <section  id="about" className="about-container">
      {/* Heading Section */}
      <h2 className="about-heading">About Us</h2>
      <h3 className="about-subheading">Who We Are</h3>

      {/* Content Section */}
      <div className="about-content">
        {/* Box 1 */}
        <div className="about-box">
          <img src={icon} alt="Icon 1" />
          <h1>Join 2 Gain: Empowering Lives, Reducing Financial Stress</h1>
          <p>
            Join 2 Gain is dedicated to improving lives by reducing financial distress
            through a variety of professional financial services.
          </p>
        </div>

        {/* Box 2 */}
        <div className="about-box">
          <img src={icon1} alt="Icon 2" />
          <h1>Join 2 Gain: Empowering Lives, Reducing Financial Stress</h1>
          <p>
            Join 2 Gain is dedicated to improving lives by reducing financial distress
            through a variety of professional financial services.
          </p>
        </div>

        {/* Box 3 */}
        <div className="about-box">
          <img src={icon2} alt="Icon 3" />
          <h1>Join 2 Gain: Empowering Lives, Reducing Financial Stress</h1>
          <p>
            Join 2 Gain is dedicated to improving lives by reducing financial distress
            through a variety of professional financial services.
          </p>
        </div>
      </div>
      
    </section>
    <img src={Rectanguler} style={{ width: "1520px" }} alt="Rectangle Image" />

   </>

  );
}

export default About;

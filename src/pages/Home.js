import React from 'react';
import Banner from '../components/Banner';
import About from './About';
import Plans from './Plans';
import Levels from './Levels';
import ContactUs from './ContactUs';

function Home() {
  return (
    <div className="home-container">
      <Banner />
      <About />
      <Plans />
      <Levels />
      <ContactUs />
    </div>
  );
}

export default Home;

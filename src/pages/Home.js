import React from 'react';
import Banner from '../components/Banner';
import About from './About';
import Plans from './Plans';
import Levels from './Levels';
import ContactUs from './ContactUs';
import Header from '../components/Header';
import Footer from '../components/Footer';
function Home() {
  return (
    <div className="home-container">
      <Header />
      <Banner />
      <About />
      <Plans />
      <Levels />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;


import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Merchandise from '../components/Merchandise';
import About from '../components/About';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import MindfulMoment from '../components/MindfulMoment';
import Blog from '../components/Blog';

const HomePage = () => {
  return (
    <>
      <Hero />
      <MindfulMoment />
      <Services />
      <Merchandise />
      <About />
      <Team />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
};

export default HomePage;
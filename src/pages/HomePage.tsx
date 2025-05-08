import React, { useEffect } from 'react';
import HeroBanner from '../components/sections/HeroBanner';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Homemates | Property & Home Services Marketplace';
  }, []);
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <HeroBanner />
    </div>
  );
};

export default HomePage;
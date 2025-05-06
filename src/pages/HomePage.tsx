import React, { useEffect } from 'react';
import HeroBanner from '../components/sections/HeroBanner';
import HomeCategories from '../components/sections/HomeCategories';
// import HomeServices from '../components/sections/HomeServices'; // Comment out services import

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Homemates | Property & Home Services Marketplace';
  }, []);
  
  return (
    <div>
      <HeroBanner />
      <div className="mt-24">
        <HomeCategories />
        {/* Services section commented out for now */}
        {/* <HomeServices /> */}
      </div>
    </div>
  );
};

export default HomePage;
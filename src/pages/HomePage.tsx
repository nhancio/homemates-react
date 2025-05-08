import React, { useEffect } from 'react';
import HeroBanner from '../components/sections/HeroBanner';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Homemates | Property & Home Services Marketplace';
  }, []);
  
  return (
    <div className="h-[calc(100vh-112px)] flex flex-col"> {/* Updated height to account for header (64px) and footer (48px) */}
      <HeroBanner />
    </div>
  );
};

export default HomePage;
import React, { useEffect } from 'react';
import HeroBanner from '../components/sections/HeroBanner';
import HomeCategories from '../components/sections/HomeCategories';
import FeaturedProperties from '../components/sections/FeaturedProperties';

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
        <FeaturedProperties 
          title="Featured Properties for Sale"
          subtitle="Discover handpicked properties available for purchase"
          viewAllLink="/buy"
          type="buy"
          limit={3}
        />
        <FeaturedProperties 
          title="Trending Rental Properties"
          subtitle="Explore the most sought-after rental properties"
          viewAllLink="/rent"
          type="rent"
          limit={3}
        />
      </div>
    </div>
  );
};

export default HomePage;
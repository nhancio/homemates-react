import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, Key, X, Wrench } from 'lucide-react'; // Add Wrench to imports
import { useAppContext } from '../../context/AppContext';

const HeroBanner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setFilters } = useAppContext();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleComingSoonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handlePropertyTypeClick = (type: string, listingType: 'rent' | 'buy') => {
    setFilters(prev => ({
      ...prev,
      [listingType]: {
        ...prev[listingType],
        propertyType: type
      }
    }));
    navigate(`/${listingType}`);
  };

  return (
    <section className="h-full relative flex items-center justify-center overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black before:opacity-40"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      />

      {/* Content Overlay */}
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Find Your Perfect Home with Homemates
          </h1>
          <p className="text-xl mb-12">
            Your dream property is just a click away
          </p>
          
          {/* Mobile-responsive button grid - Updated for rectangular buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto px-4">
            <Link 
              to="/rent" 
              className="flex flex-col items-center justify-center bg-[#FF4E8E] text-white hover:bg-opacity-90 p-2 sm:p-4 rounded-xl font-medium transition shadow hover:shadow-lg h-16 sm:h-24"
            >
              <Key className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-xs sm:text-sm mt-1 sm:mt-2">Rent</span>
            </Link>
            <Link 
              to="/buy"
              className="flex flex-col items-center justify-center bg-[#FFA5B8] text-white hover:bg-opacity-90 p-2 sm:p-4 rounded-xl font-medium transition shadow hover:shadow-lg h-16 sm:h-24"
            >
              <Home className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-xs sm:text-sm mt-1 sm:mt-2">Buy</span>
            </Link>
            <button 
              onClick={handleComingSoonClick}
              className="flex flex-col items-center justify-center bg-[#D84C89] text-white hover:bg-opacity-90 p-2 sm:p-4 rounded-xl font-medium transition shadow hover:shadow-lg h-16 sm:h-24"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-xs sm:text-sm mt-1 sm:mt-2">Find Friends</span>
            </button>
            <button
              onClick={handleComingSoonClick}
              className="flex flex-col items-center justify-center bg-[#DBA6CF] text-white hover:bg-opacity-90 p-2 sm:p-4 rounded-xl font-medium transition shadow hover:shadow-lg h-16 sm:h-24"
            >
              <Wrench className="w-6 h-6 sm:w-8 sm:h-8" /> {/* Changed from Home to Wrench */}
              <span className="text-xs sm:text-sm mt-1 sm:mt-2">Services</span>
            </button>
          </div>

          {/* Property Filtering Buttons - Temporarily Disabled */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <button onClick={() => handlePropertyTypeClick('Villa', 'buy')} className="filter-btn">Villa</button>
            <button onClick={() => handlePropertyTypeClick('Gated Community', 'buy')} className="filter-btn">Gated</button>
            <button onClick={() => handlePropertyTypeClick('Independent House', 'buy')} className="filter-btn">Independent</button>
            <button onClick={() => handlePropertyTypeClick('Flat', 'buy')} className="filter-btn">Flat</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <button onClick={() => handlePropertyTypeClick('1 BHK', 'rent')} className="filter-btn">Single Room</button>
            <button onClick={() => handlePropertyTypeClick('2 BHK', 'rent')} className="filter-btn">2 BHK</button>
            <button onClick={() => handlePropertyTypeClick('3 BHK', 'rent')} className="filter-btn">3 BHK</button>
            <button onClick={() => handlePropertyTypeClick('4 BHK', 'rent')} className="filter-btn">4 BHK</button>
          </div> */}
        </div>
      </div>

      {/* Coming Soon Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm mx-4 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-gray-600">
              We're brewing some cool features for you! Stay tuned for updates.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Key } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative py-8">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      />

      {/* Content Overlay */}
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Home & Flatmates
          </h1>
          <p className="text-lg mb-8">
            Your dream property is just a click away
          </p>
          
          {/* Mobile-responsive button grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <Link 
              to="/rent" 
              className="aspect-square flex flex-col items-center justify-center bg-white text-gray-800 hover:bg-gray-100 p-6 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              <Key className="w-8 h-8 mb-2" />
              <span>Rent</span>
            </Link>
            <Link 
              to="/users"
              className="aspect-square flex flex-col items-center justify-center bg-white text-gray-800 hover:bg-gray-100 p-6 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              <Users className="w-8 h-8 mb-2" />
              <span>Find Friends</span>
            </Link>
            <Link 
              to="/buy" 
              className="aspect-square flex flex-col items-center justify-center bg-white text-gray-800 hover:bg-gray-100 p-6 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              <Home className="w-8 h-8 mb-2" />
              <span>Buy</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
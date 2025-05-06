import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Key, Users, Wrench } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Modern home exterior" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Find Your Perfect Home
          </h1>
          <p className="text-base text-gray-100 mb-6">
            Your dream property is just a search away
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            <Link 
              to="/buy" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-2 px-4 rounded-md font-medium transition"
            >
              <Home className="w-4 h-4 mr-2" />
              Buy
            </Link>
            <Link 
              to="/find-friends" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-2 px-4 rounded-md font-medium transition"
            >
              <Users className="w-4 h-4 mr-2" />
              Find Friends
            </Link>
            <Link 
              to="/rent" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-2 px-4 rounded-md font-medium transition"
            >
              <Key className="w-4 h-4 mr-2" />
              Rent
            </Link>
          </div>
        </div>
      </div>
      
      {/* Property Search Bar */}
      <div className="container relative pb-6 md:pb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 -mb-12 md:-mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                placeholder="City, neighborhood, or address"
                className="input text-gray-900" // Added text color
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select className="input text-gray-900"> // Added text color
                <option value="">All Types</option>
                <option value="flat">Flat</option>
                <option value="gated_community">Gated Community</option>
                <option value="independent_house">Independent House</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
              <button className="btn btn-primary h-full flex items-center justify-center">
                <Building className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
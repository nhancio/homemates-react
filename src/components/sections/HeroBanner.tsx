import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Key, Wrench } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Modern home exterior" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative py-16 md:py-24">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find Your Dream Home with Homemates
          </h1>
          <p className="text-lg text-gray-100 mb-8">
            Discover properties for sale, rent, and professional home services all in one place.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link 
              to="/buy" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-3 px-6 rounded-md font-medium transition"
            >
              <Home className="w-5 h-5 mr-2" />
              Buy
            </Link>
            <Link 
              to="/rent" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-3 px-6 rounded-md font-medium transition"
            >
              <Key className="w-5 h-5 mr-2" />
              Rent
            </Link>
            <Link 
              to="/services" 
              className="flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 py-3 px-6 rounded-md font-medium transition"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Services
            </Link>
          </div>
        </div>
      </div>
      
      {/* Property Search Bar */}
      <div className="container relative pb-8 md:pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 -mb-12 md:-mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                placeholder="City, neighborhood, or address"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select className="input">
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PropertyCard from '../components/ui/PropertyCard';
import { getMockProperties } from '../data/properties';

const SavedPage = () => {
  const { favoriteProperties } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Saved Properties | Homemates';
  }, []);
  
  const allSavedProperties = getMockProperties().filter(property => 
    favoriteProperties.includes(property.id)
  );
  
  const filteredProperties = activeFilter === 'all' 
    ? allSavedProperties
    : allSavedProperties.filter(property => property.listingType === activeFilter);
  
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-2xl font-bold mb-6">Saved Properties</h1>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('buy')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'buy' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Buy
          </button>
          <button 
            onClick={() => setActiveFilter('rent')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'rent' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rent
          </button>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring and save properties that catch your interest.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/buy" className="btn btn-primary">Buy Properties</Link>
              <Link to="/rent" className="btn btn-secondary">Rent Properties</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage
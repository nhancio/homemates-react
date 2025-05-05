import React, { useEffect } from 'react';
import PropertyFilters from '../components/filters/PropertyFilters';
import PropertyCard from '../components/ui/PropertyCard';
import { Building } from 'lucide-react';
import { getMockProperties } from '../data/properties';

const propertyTypes = [
  'Flat',
  'Gated Community',
  'Independent House',
  'Villa'
];

const BuyPropertiesPage = () => {
  const properties = getMockProperties().filter(property => property.listingType === 'buy');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Buy Properties | Homemates';
  }, []);
  
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Properties for Sale</h1>
          <p className="text-gray-600">
            Find your dream home from our curated list of properties for sale
          </p>
        </div>
        
        <PropertyFilters propertyTypes={propertyTypes} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {properties.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Building className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new listings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPropertiesPage;
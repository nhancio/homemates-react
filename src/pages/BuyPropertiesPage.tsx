import React, { useEffect, useState } from 'react';
import PropertyFilters from '../components/filters/PropertyFilters';
import PropertyCard from '../components/ui/PropertyCard';
import { Building, Loader } from 'lucide-react';
import { getListings } from '../services/listings';
import { useAppContext } from '../context/AppContext';

const propertyTypes = {
  buy: ['Flat', 'Gated Community', 'Independent House', 'Villa'],
  rent: ['Single Room', '2BHK', '3BHK', '4BHK']
};

const BuyPropertiesPage = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filters } = useAppContext();
  const [listingType, setListingType] = useState<'buy' | 'rent'>('buy');

  useEffect(() => {
    fetchProperties();
  }, [listingType, filters[listingType]]);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const listings = await getListings(listingType === 'buy' ? 'sell' : 'rent', filters[listingType]);
      setProperties(listings);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${listingType === 'buy' ? 'Buy' : 'Rent'} Properties | Homemates`;
  }, [listingType]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <Building className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error Loading Properties</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Properties for {listingType === 'buy' ? 'Sale' : 'Rent'}
          </h1>
          <p className="text-gray-600">
            {listingType === 'buy' 
              ? 'Find your dream home from our curated list of properties for sale'
              : 'Explore a wide range of rental properties to suit your needs'
            }
          </p>
        </div>

        {/* Listing Type Toggle */}
        <div className="flex rounded-lg overflow-hidden w-64 border mb-6">
          <button
            onClick={() => setListingType('buy')}
            className={`flex-1 py-2 ${
              listingType === 'buy' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setListingType('rent')}
            className={`flex-1 py-2 ${
              listingType === 'rent' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            Rent
          </button>
        </div>
        
        <PropertyFilters 
          propertyTypes={propertyTypes[listingType]} 
          listingType={listingType}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {properties.length === 0 && !isLoading && (
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
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface PropertyFiltersProps {
  propertyTypes: string[];
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ propertyTypes }) => {
  const { filters, setFilters } = useAppContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'priceMin' || name === 'priceMax' ? Number(value) : value,
    });
  };
  
  const clearFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 10000000,
      location: '',
      propertyType: '',
    });
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg mb-6">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <button 
          onClick={toggleFilters} 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium md:hidden"
        >
          {isFilterOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      
      <div className={`border-t border-gray-100 p-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  name="priceMin"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={handleFilterChange}
                  className="input"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  name="priceMax"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={handleFilterChange}
                  className="input"
                />
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              name="location"
              placeholder="Enter location"
              value={filters.location}
              onChange={handleFilterChange}
              className="input"
            />
          </div>
          
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select 
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="input"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            onClick={clearFilters}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
          <button className="btn btn-primary">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
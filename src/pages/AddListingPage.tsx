import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Home, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AddListingPage = () => {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/profile');
    }
    
    window.scrollTo(0, 0);
    document.title = 'Add Listing | Homemates';
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };
  
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Property Images</h2>
            <div className="grid grid-cols-3 gap-4">
              <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-primary-500 transition-colors">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Photo</span>
              </button>
            </div>
          </div>
          
          {/* Basic Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Title
                </label>
                <input type="text" className="input" placeholder="e.g., Modern 2BHK Apartment" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input type="text" className="input pl-10" placeholder="Property location" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select className="input">
                    <option value="">Select type</option>
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Listing Type
                  </label>
                  <select className="input">
                    <option value="">Select type</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input type="number" className="input pl-10" placeholder="Property price" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Features */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Property Features</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input type="number" className="input" placeholder="Number of bedrooms" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input type="number" className="input" placeholder="Number of bathrooms" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (sq ft)
                </label>
                <input type="number" className="input" placeholder="Total area" />
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full btn btn-primary">
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
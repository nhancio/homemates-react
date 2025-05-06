import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Calendar, X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AddListingPage = () => {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<'rent' | 'sell'>('rent');
  const [formData, setFormData] = useState({
    // Common fields
    address: {
      city: '',
      locality: '',
      buildingName: '',
    },
    propertyType: '',
    furnishingType: '',
    parking: '',
    buildingType: '',
    handoverDate: '',
    isImmediate: false,
    description: '',
    
    // Rent specific fields
    rentDetails: {
      preferredTenant: {
        lookingFor: '', // male/female
        preferences: [] as string[], // vegetarian, non-smoker etc
      },
      roomDetails: {
        availableRooms: 0,
        roomType: '', // shared/private
        bathroomType: '', // attached/common
      },
      costs: {
        rent: 0,
        maintenance: 0,
        securityDeposit: 0,
        setupCost: 0,
        brokerage: 0,
      },
      additionalBills: {
        wifi: 0,
        water: 0,
        gas: 0,
        cook: 0,
        maid: 0,
        others: 0,
      }
    },

    // Amenities for both rent and sell
    amenities: {
      appliances: [] as string[],
      furniture: [] as string[],
      building: [] as string[],
    },
    
    // Sell specific fields
    sellDetails: {
      price: 0,
      gst: 0,
    },
    builtUpArea: 0,
    ageOfProperty: '',
  });
  
  // Image handling state
  const [images, setImages] = useState<string[]>([]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (images.length + files.length > 5) {
        alert('Maximum 5 images allowed');
        return;
      }
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Toggle functions and handlers
  const handleAmenityToggle = (category: 'appliances' | 'furniture' | 'building', item: string) => {
    setFormData(prev => {
      const amenities = { ...prev.amenities };
      if (amenities[category].includes(item)) {
        amenities[category] = amenities[category].filter(i => i !== item);
      } else {
        amenities[category] = [...amenities[category], item];
      }
      return { ...prev, amenities };
    });
  };

  const preferredTenantOptions = {
    preferences: ['Vegetarian', 'Non-smoker', 'Non-alcoholic', 'Pet friendly', 'Party Friendly', 'Night owl']
  };

  const amenityOptions = {
    appliances: ['TV', 'Fridge', 'AC', 'Washing Machine', 'Water Purifier', 'Geyser'],
    furniture: ['Bed', 'Sofa', 'Dining Table', 'Kitchenware', 'Cupboards'],
    building: ['Lift', 'Security', 'Clubhouse', 'CCTV', 'Games']
  };

  const renderRentFields = () => (
    <>
      {/* Preferred Tenant Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Preferred Tenant</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Looking for</label>
            <select 
              className="input"
              value={formData.rentDetails.preferredTenant.lookingFor}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                rentDetails: {
                  ...prev.rentDetails,
                  preferredTenant: {
                    ...prev.rentDetails.preferredTenant,
                    lookingFor: e.target.value
                  }
                }
              }))}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            {preferredTenantOptions.preferences.map(pref => (
              <label 
                key={pref}
                className={`flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                  formData.rentDetails.preferredTenant.preferences.includes(pref) 
                    ? 'border-primary-500 bg-primary-50' 
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.rentDetails.preferredTenant.preferences.includes(pref)}
                  onChange={() => {
                    setFormData(prev => {
                      const preferences = prev.rentDetails.preferredTenant.preferences;
                      const updated = preferences.includes(pref)
                        ? preferences.filter(p => p !== pref)
                        : [...preferences, pref];
                      
                      return {
                        ...prev,
                        rentDetails: {
                          ...prev.rentDetails,
                          preferredTenant: {
                            ...prev.rentDetails.preferredTenant,
                            preferences: updated
                          }
                        }
                      };
                    });
                  }}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Room Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Rooms</label>
            <input
              type="number"
              className="input"
              value={formData.rentDetails.roomDetails.availableRooms}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                rentDetails: {
                  ...prev.rentDetails,
                  roomDetails: {
                    ...prev.rentDetails.roomDetails,
                    availableRooms: Number(e.target.value)
                  }
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select
              className="input"
              value={formData.rentDetails.roomDetails.roomType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                rentDetails: {
                  ...prev.rentDetails,
                  roomDetails: {
                    ...prev.rentDetails.roomDetails,
                    roomType: e.target.value
                  }
                }
              }))}
            >
              <option value="">Select Room Type</option>
              <option value="shared">Shared</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathroom Type</label>
            <select
              className="input"
              value={formData.rentDetails.roomDetails.bathroomType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                rentDetails: {
                  ...prev.rentDetails,
                  roomDetails: {
                    ...prev.rentDetails.roomDetails,
                    bathroomType: e.target.value
                  }
                }
              }))}
            >
              <option value="">Select Bathroom Type</option>
              <option value="attached">Attached</option>
              <option value="common">Common</option>
            </select>
          </div>
        </div>
      </section>

      {/* Rent Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Rent Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['rent', 'maintenance', 'securityDeposit', 'setupCost', 'brokerage'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
              </label>
              <input
                type="number"
                className="input"
                value={formData.rentDetails.costs[field as keyof typeof formData.rentDetails.costs]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  rentDetails: {
                    ...prev.rentDetails,
                    costs: {
                      ...prev.rentDetails.costs,
                      [field]: Number(e.target.value)
                    }
                  }
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Bills Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Additional Bills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(formData.rentDetails.additionalBills).map(bill => (
            <div key={bill}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {bill.charAt(0).toUpperCase() + bill.slice(1)} Bill
              </label>
              <input
                type="number"
                className="input"
                value={formData.rentDetails.additionalBills[bill as keyof typeof formData.rentDetails.additionalBills]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  rentDetails: {
                    ...prev.rentDetails,
                    additionalBills: {
                      ...prev.rentDetails.additionalBills,
                      [bill]: Number(e.target.value)
                    }
                  }
                }))}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderSellFields = () => (
    <>
      {/* Cost Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Cost Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              className="input"
              value={formData.sellDetails.price}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                sellDetails: { ...prev.sellDetails, price: Number(e.target.value) }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST (%)</label>
            <input
              type="number"
              className="input"
              value={formData.sellDetails.gst}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                sellDetails: { ...prev.sellDetails, gst: Number(e.target.value) }
              }))}
            />
          </div>
        </div>
      </section>

      {/* Built-up Area Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Built-up Area (sq ft)</label>
            <input
              type="number"
              className="input"
              placeholder="Enter built-up area"
              value={formData.builtUpArea}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                builtUpArea: Number(e.target.value)
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age of Property</label>
            <select
              className="input"
              value={formData.ageOfProperty}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                ageOfProperty: e.target.value
              }))}
            >
              <option value="">Select Age</option>
              <option value="0-2">0-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );

  // Modify the return statement in your render to conditionally show fields
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Add New Listing</h1>
          
          {/* Listing Type Toggle */}
          <div className="flex rounded-lg overflow-hidden w-64 border">
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
            <button
              onClick={() => setListingType('sell')}
              className={`flex-1 py-2 ${
                listingType === 'sell' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700'
              }`}
            >
              Sell
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="input"
                value={formData.address.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Locality"
                className="input"
                value={formData.address.locality}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, locality: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Building Name"
                className="input"
                value={formData.address.buildingName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, buildingName: e.target.value }
                }))}
              />
            </div>
          </section>

          {/* Property Details Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Property Details</h2>
            {/* Property type buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                  className={`p-3 rounded-full border-2 ${
                    formData.propertyType === type 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-primary-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing Type</label>
                <select 
                  className="input"
                  value={formData.furnishingType}
                  onChange={(e) => setFormData(prev => ({ ...prev, furnishingType: e.target.value }))}
                >
                  <option value="">Select Furnishing Type</option>
                  <option value="fully">Fully Furnished</option>
                  <option value="semi">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                <select 
                  className="input"
                  value={formData.parking}
                  onChange={(e) => setFormData(prev => ({ ...prev, parking: e.target.value }))}
                >
                  <option value="">Select Parking Type</option>
                  <option value="car">Car Parking</option>
                  <option value="bike">Bike Parking</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select 
                  className="input"
                  value={formData.buildingType}
                  onChange={(e) => setFormData(prev => ({ ...prev, buildingType: e.target.value }))}
                >
                  <option value="">Select Property Type</option>
                  <option value="gated">Gated Community</option>
                  <option value="standalone">Standalone</option>
                  <option value="individual">Individual House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>
          </section>

          {/* Handover Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Handover</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isImmediate}
                  onChange={(e) => setFormData(prev => ({ ...prev, isImmediate: e.target.checked }))}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <span>Immediate</span>
              </label>

              {!formData.isImmediate && (
                <input
                  type="date"
                  className="input"
                  value={formData.handoverDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, handoverDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              )}
            </div>
          </section>

          {/* Conditional rendering based on listing type */}
          {listingType === 'rent' ? (
            renderRentFields()
          ) : (
            renderSellFields()
          )}

          {/* Amenities Section */}
          {listingType === 'rent' && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Amenities</h2>
              {Object.entries(amenityOptions).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-md font-medium mb-3 capitalize">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map(item => (
                      <label 
                        key={item}
                        className={`flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                          formData.amenities[category as keyof typeof formData.amenities].includes(item)
                            ? 'border-primary-500 bg-primary-50'
                            : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities[category as keyof typeof formData.amenities].includes(item)}
                          onChange={() => handleAmenityToggle(category as 'appliances' | 'furniture' | 'building', item)}
                          className="form-checkbox h-4 w-4 text-primary-600"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Description Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <textarea
              className="input min-h-[100px]"
              placeholder="Add property description..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </section>

          {/* Images Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-primary-500 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </section>

          <button type="submit" className="w-full btn btn-primary">
            Post {listingType === 'rent' ? 'Rental' : 'Sale'} Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
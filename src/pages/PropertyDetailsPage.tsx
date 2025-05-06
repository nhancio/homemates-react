import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListings } from '../services/listings';
import { Phone, Share2, Heart, Building, Loader } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/format';
import { getShareableUrl } from '../utils/share';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const PropertyDetailsPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteProperties, toggleFavorite } = useAppContext();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        // Try both rent and sell collections
        let propertyData = await getListings('rent', { id: propertyId });
        if (!propertyData.length) {
          propertyData = await getListings('sell', { id: propertyId });
        }
        
        if (propertyData.length > 0) {
          setProperty(propertyData[0]);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const handleCall = () => {
    if (property?.contactNumber) {
      window.location.href = `tel:${property.contactNumber}`;
    } else {
      alert('Contact number not available');
    }
  };

  const handleShare = async () => {
    if (!property) return;
    
    const url = getShareableUrl(property.id, property.listingType);
    const shareText = `Check out this property on Homemates!\n${property.address?.buildingName}\n${url}`;

    try {
      if (navigator.share) {
        await navigator.share({ text: shareText, url });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Image Gallery */}
      <div className="mb-8 relative rounded-lg overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-[400px]"
        >
          {(property.images?.length ? property.images : ['placeholder']).map((image: string, index: number) => (
            <SwiperSlide key={index}>
              {image === 'placeholder' ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Building className="w-16 h-16 text-gray-400" />
                </div>
              ) : (
                <img src={image} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.address?.buildingName}</h1>
          <p className="text-xl text-primary-600 font-bold mb-4">
            ₹{formatCurrency(property.rentDetails?.costs?.rent || property.sellDetails?.price || 0)}
            {property.rentDetails && <span className="text-gray-500 text-base">/month</span>}
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-600">Type</span>
                <p className="font-semibold">{property.propertyType}</p>
              </div>
              <div>
                <span className="text-gray-600">Furnishing</span>
                <p className="font-semibold">{property.furnishingType}</p>
              </div>
              {/* Add more property details */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={handleCall}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Contact Owner
              </button>
              <button
                onClick={() => toggleFavorite(property.id)}
                className="btn btn-secondary flex items-center justify-center gap-2"
              >
                <Heart className={favoriteProperties.includes(property.id) ? 'fill-red-500' : ''} />
                {favoriteProperties.includes(property.id) ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleShare}
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;

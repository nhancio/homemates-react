import React, { useState } from 'react';
import { Phone, Share2, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppContext } from '../../context/AppContext';
import { Property } from '../../types/property';
import { formatCurrency } from '../../utils/format';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favoriteProperties, toggleFavorite } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const isFavorite = favoriteProperties.includes(property.id);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  const handleCall = () => {
    console.log(`Calling owner of property ${property.id}`);
  };
  
  const handleShare = () => {
    navigator.share?.({
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href,
    }).catch(err => {
      console.error('Error sharing property:', err);
    });
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-property-card hover:shadow-lg transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="h-52"
        >
          {property.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={`h-52 bg-gray-200 ${!isLoaded ? 'animate-pulse' : ''}`}>
                <img
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {property.type}
          </span>
        </div>
      </div>
      
      {/* Property Information */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
          <span className="text-lg font-bold text-primary-600">₹{formatCurrency(property.price)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-1">{property.location}</p>
        
        {/* Property Features */}
        <div className="flex gap-4 mt-3 text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <span className="font-semibold">{property.bedrooms}</span>
            <span className="text-xs text-gray-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">{property.bathrooms}</span>
            <span className="text-xs text-gray-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">{property.area}</span>
            <span className="text-xs text-gray-500">Sq.ft</span>
          </div>
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="flex border-t border-gray-200">
        <button 
          onClick={() => toggleFavorite(property.id)}
          className="flex items-center justify-center w-1/3 py-3 hover:bg-gray-50 transition"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          <span className="text-sm text-black">Wishlist</span>
        </button>
        <button 
          onClick={handleCall}
          className="flex items-center justify-center w-1/3 py-3 text-primary-600 hover:bg-primary-50 transition border-l border-r border-gray-200"
        >
          <Phone className="w-4 h-4 mr-1" />
          <span className="text-sm text-black">Call</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center justify-center w-1/3 py-3 text-gray-600 hover:bg-gray-50 transition"
        >
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-sm text-black">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard
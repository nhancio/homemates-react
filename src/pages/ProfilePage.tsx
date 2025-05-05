import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Heart, Award, Settings, Clock, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PropertyCard from '../components/ui/PropertyCard';
import { getMockProperties } from '../data/properties';

const ProfilePage = () => {
  const { user, isAuthenticated, favoriteProperties, login, logout } = useAppContext();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'My Profile | Homemates';
  }, []);
  
  // Simulate a user if none is authenticated
  const profileUser = user || {
    id: 'mock-user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    isPremium: false
  };
  
  // Get favorite properties
  const userFavorites = getMockProperties().filter(property => 
    favoriteProperties.includes(property.id)
  );
  
  if (!isAuthenticated) {
    return (
      <div className="py-20">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view your profile and saved properties
            </p>
            <button 
              onClick={() => login()}
              className="flex items-center justify-center w-full btn btn-primary"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-800"></div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start -mt-16 mb-4 md:mb-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white p-2">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-16 h-16 text-primary-600" />
                      </div>
                    )}
                  </div>
                  {profileUser.isPremium && (
                    <div className="absolute -right-2 -bottom-2 bg-accent-500 text-white p-1 rounded-full">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* User Info */}
              <div className="md:ml-6 text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                  <div className="mt-2 md:mt-0">
                    <button 
                      onClick={logout}
                      className="btn btn-primary px-8" // Added px-8 for wider button
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="flex items-center justify-center md:justify-start text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {profileUser.email}
                  </p>
                  <p className="flex items-center justify-center md:justify-start text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    +1 (555) 123-4567
                  </p>
                  <p className="flex items-center justify-center md:justify-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    New York, USA
                  </p>
                  <p className="flex items-center justify-center md:justify-start text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Member since June 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Membership Status */}
        {!profileUser.isPremium && (
          <div className="mt-8 bg-gradient-to-r from-accent-500 to-amber-500 text-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Upgrade to Premium</h2>
                <p className="mb-4 md:mb-0">
                  Get exclusive access to premium listings, priority support, and more!
                </p>
              </div>
              <Link
                to="/premium"
                className="bg-white text-accent-600 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
        
        {/* Saved Properties */}
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <Heart className="w-5 h-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold">Saved Properties</h2>
          </div>
          
          {userFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userFavorites.map(property => (
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
    </div>
  );
};

export default ProfilePage;
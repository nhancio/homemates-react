import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusSquare, Heart, User, Home } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, login } = useAppContext();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-nav">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/src/assets/homemates-logo.jpeg" 
              alt="Homemates Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary-600">Homemates</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 ${isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/add-listing" 
              className={`flex items-center space-x-2 ${isActive('/add-listing') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <PlusSquare className="w-5 h-5" />
              <span>Add Listing</span>
            </Link>
            <Link 
              to="/saved" 
              className={`flex items-center space-x-2 ${isActive('/saved') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
            >
              <Heart className="w-5 h-5" />
              <span>Saved</span>
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className={`flex items-center space-x-2 ${isActive('/profile') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            ) : (
              <button 
                onClick={() => login()}
                className="flex items-center space-x-2 btn btn-primary"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
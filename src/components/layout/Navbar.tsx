import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-nav">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-600">Homemates</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
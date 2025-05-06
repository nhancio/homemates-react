import React from 'react';
import { Mail, Instagram, Linkedin, MessageCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center space-x-2">
            <img 
              src="/src/assets/homemates-logo.jpeg" 
              alt="Homemates Logo" 
              className="h-6 w-6"
            />
            <span className="text-lg font-semibold text-white">Homemates</span>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <a href="mailto:contact@homemates.com" className="flex items-center hover:text-white transition">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
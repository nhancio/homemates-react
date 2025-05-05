import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, description, link }) => {
  return (
    <Link 
      to={link}
      className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-3 rounded-full bg-primary-50 text-primary-600 w-fit mb-4 group-hover:bg-primary-100 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-primary-600 font-medium">
        <span className="mr-2">Explore</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default CategoryCard;
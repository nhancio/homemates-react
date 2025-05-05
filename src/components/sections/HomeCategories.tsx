import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import { Home, Building, Key, Castle, Landmark, Hotel, Bed, Sofa } from 'lucide-react';

const HomeCategories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Find Properties by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse properties based on your preferences and requirements
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            title="Flat"
            icon={<Building className="w-6 h-6" />}
            description="Modern apartments with all amenities for comfortable living"
            link="/buy?type=flat"
          />
          
          <CategoryCard 
            title="Gated Community"
            icon={<Landmark className="w-6 h-6" />}
            description="Secure gated communities with premium lifestyle amenities"
            link="/buy?type=gated_community"
          />
          
          <CategoryCard 
            title="Independent House"
            icon={<Home className="w-6 h-6" />}
            description="Standalone houses offering privacy and freedom of space"
            link="/buy?type=independent_house"
          />
          
          <CategoryCard 
            title="Villa"
            icon={<Castle className="w-6 h-6" />}
            description="Luxury villas with modern architecture and exclusive features"
            link="/buy?type=villa"
          />
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Rental Options</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find rental properties that match your requirements and budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            title="Single Room"
            icon={<Bed className="w-6 h-6" />}
            description="Affordable single rooms perfect for students and singles"
            link="/rent?type=single_room"
          />
          
          <CategoryCard 
            title="2BHK"
            icon={<Sofa className="w-6 h-6" />}
            description="Comfortable 2 bedroom apartments ideal for small families"
            link="/rent?type=2bhk"
          />
          
          <CategoryCard 
            title="3BHK"
            icon={<Hotel className="w-6 h-6" />}
            description="Spacious 3 bedroom apartments for families and professionals"
            link="/rent?type=3bhk"
          />
          
          <CategoryCard 
            title="4BHK"
            icon={<Key className="w-6 h-6" />}
            description="Luxury 4 bedroom homes with abundant space and amenities"
            link="/rent?type=4bhk"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
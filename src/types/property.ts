export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  listingType: 'buy' | 'rent';
  listedAt: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection references
const rentCollection = collection(db, 'r');
const sellCollection = collection(db, 's');

export interface ListingData {
  address: {
    city: string;
    locality: string;
    buildingName: string;
  };
  propertyType: string;
  furnishingType: string;
  parking: string;
  buildingType: string;
  handoverDate: string;
  isImmediate: boolean;
  description: string;
  amenities: {
    appliances: string[];
    furniture: string[];
    building: string[];
  };
  images: string[];
  createdAt: number;
  userId: string;
  status: 'active' | 'inactive';
}

export interface RentListing extends ListingData {
  rentDetails: {
    preferredTenant: {
      lookingFor: string;
      preferences: string[];
    };
    roomDetails: {
      availableRooms: number;
      roomType: string;
      bathroomType: string;
    };
    costs: {
      rent: number;
      maintenance: number;
      securityDeposit: number;
      setupCost: number;
      brokerage: number;
    };
    additionalBills: {
      wifi: number;
      water: number;
      gas: number;
      cook: number;
      maid: number;
      others: number;
    };
  };
}

export interface SellListing extends ListingData {
  sellDetails: {
    price: number;
    gst: number;
  };
}

export async function createListing(type: 'rent' | 'sell', data: RentListing | SellListing) {
  const collection = type === 'rent' ? rentCollection : sellCollection;
  return await addDoc(collection, {
    ...data,
    createdAt: Date.now(),
    status: 'active'
  });
}

export async function getListings(type: 'rent' | 'sell', filters?: any) {
  const collection = type === 'rent' ? rentCollection : sellCollection;
  let q = query(collection, where('status', '==', 'active'));
  
  // Add more query filters based on the filters parameter
  if (filters) {
    // Example: if (filters.city) q = query(q, where('address.city', '==', filters.city));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

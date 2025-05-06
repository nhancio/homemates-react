import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

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
  try {
    // Validate user is authenticated
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to create a listing');
    }

    // Sanitize the data to ensure all fields exist
    const sanitizedData = {
      ...data,
      createdAt: Date.now(),
      status: 'active' as const,
      userId: user.uid, // Ensure userId is set from authenticated user
    };

    // Remove any undefined or null values and empty arrays/objects
    const cleanData = Object.entries(sanitizedData).reduce((acc, [key, value]) => {
      if (value != null && 
          !(Array.isArray(value) && value.length === 0) &&
          !(typeof value === 'object' && Object.keys(value).length === 0)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    console.log('Creating listing with data:', cleanData);
    console.log('Collection:', type === 'rent' ? 'r' : 's');

    const collectionRef = collection(db, type === 'rent' ? 'r' : 's');
    const docRef = await addDoc(collectionRef, cleanData);
    
    console.log('Document written with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating listing:', error);
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to create listings');
    }
    throw error;
  }
}

export async function getListings(type: 'rent' | 'sell', filters?: any) {
  try {
    // Use the correct collection reference based on type
    const collectionRef = collection(db, type === 'rent' ? 'r' : 's');
    
    // Start with active listings query
    let q = query(collectionRef);
    
    // Add filters if they exist
    if (filters) {
      const constraints: any[] = [];
      
      if (filters.priceMin) {
        constraints.push(where(type === 'rent' ? 'rentDetails.costs.rent' : 'sellDetails.price', '>=', Number(filters.priceMin)));
      }
      if (filters.priceMax) {
        constraints.push(where(type === 'rent' ? 'rentDetails.costs.rent' : 'sellDetails.price', '<=', Number(filters.priceMax)));
      }
      if (filters.propertyType) {
        constraints.push(where('propertyType', '==', filters.propertyType));
      }
      if (filters.location) {
        constraints.push(where('address.city', '==', filters.location));
      }
      
      if (constraints.length > 0) {
        q = query(collectionRef, ...constraints);
      }
    }

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw new Error('Failed to fetch listings. Please try again later.');
  }
}

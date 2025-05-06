import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
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
  contactNumber: string;  // Add this field
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

    // Use correct collection names - 'r' for rent and 's' for sell
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
    console.log('Getting listings for type:', type, 'with filters:', filters);
    // Use correct collection names - 'r' for rent and 's' for sell
    const collectionRef = collection(db, type === 'rent' ? 'r' : 's');
    
    // Start with base query
    let baseQuery = query(collectionRef);
    
    // Add status filter
    baseQuery = query(baseQuery, where('status', '==', 'active'));
    
    // Add other filters if they exist
    if (filters) {
      if (filters.propertyType) {
        baseQuery = query(baseQuery, where('propertyType', '==', filters.propertyType));
      }
      
      // Add other filters as needed...
    }

    // Execute query
    const snapshot = await getDocs(baseQuery);
    console.log('Query returned:', snapshot.size, 'documents');

    // Transform and filter results
    const listings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      contactNumber: doc.data().contactNumber || ''
    }));

    // Apply client-side filters that don't require indexes
    let filteredListings = listings;
    if (filters) {
      if (filters.priceMin || filters.priceMax) {
        filteredListings = filteredListings.filter(listing => {
          const price = type === 'rent' 
            ? listing.rentDetails?.costs?.rent 
            : listing.sellDetails?.price;
          
          if (filters.priceMin && price < Number(filters.priceMin)) return false;
          if (filters.priceMax && price > Number(filters.priceMax)) return false;
          return true;
        });
      }
    }

    console.log('Returning filtered listings:', filteredListings.length);
    return filteredListings;

  } catch (error) {
    console.error('Error in getListings:', error);
    throw new Error(`Failed to fetch ${type} listings: ${error.message}`);
  }
}

export async function getPropertyById(type: 'rent' | 'sell', id: string) {
  try {
    console.log('Fetching property:', { type, id });
    // Use 'r' for rent and 's' for sell collections
    const collectionName = type === 'rent' ? 'r' : 's';
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('Document not found in collection:', collectionName);
      throw new Error('Property not found');
    }

    const data = docSnap.data();
    console.log('Found property data:', data);

    return {
      id: docSnap.id,
      ...data,
      listingType: type // Add listing type to response
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

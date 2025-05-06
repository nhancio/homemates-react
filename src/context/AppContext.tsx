import React, { createContext, useContext, useState, ReactNode } from 'react';
import { signInWithGoogle, logoutUser } from '../services/auth';

type BaseFilters = {
  priceMin: number;
  priceMax: number;
  location: string;
  propertyType: string;
};

type RentFilters = BaseFilters & {
  roomType: string;
  tenantType: string;
  bathroomType: string;
};

type BuyFilters = BaseFilters & {
  builtUpArea: number;
  ageOfProperty: string;
  possessionStatus: string;
};

type Filters = {
  rent: RentFilters;
  buy: BuyFilters;
  activeType: 'rent' | 'buy';
};

type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  isPremium: boolean;
  preferences?: string[];
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  login: () => Promise<void>; // Changed to return Promise
  logout: () => Promise<void>; // Changed to return Promise
  favoriteProperties: string[];
  toggleFavorite: (propertyId: string) => void;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}

const defaultFilters: Filters = {
  activeType: 'buy',
  rent: {
    priceMin: 0,
    priceMax: 100000,
    location: '',
    propertyType: '',
    roomType: '',
    tenantType: '',
    bathroomType: ''
  },
  buy: {
    priceMin: 0,
    priceMax: 10000000,
    location: '',
    propertyType: '',
    builtUpArea: 0,
    ageOfProperty: '',
    possessionStatus: ''
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get user from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);

  const login = async () => {
    const result = await signInWithGoogle();
    if (result.success && result.user) {
      setUser(result.user);
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      if (result.isNewUser) {
        setShowPreferences(true);
      }
    }
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      // Remove user from localStorage
      localStorage.removeItem('user');
    }
  };

  const toggleFavorite = (propertyId: string) => {
    setFavoriteProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    filters,
    setFilters,
    login,
    logout,
    favoriteProperties,
    toggleFavorite,
    showPreferences,
    setShowPreferences,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {showPreferences && user && (
        <PreferencesModal onClose={() => setShowPreferences(false)} />
      )}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
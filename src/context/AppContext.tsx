import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
};

type Filters = {
  priceMin: number;
  priceMax: number;
  location: string;
  propertyType: string;
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  login: (user: User) => void;
  logout: () => void;
  favoriteProperties: string[];
  toggleFavorite: (propertyId: string) => void;
}

const defaultFilters: Filters = {
  priceMin: 0,
  priceMax: 10000000,
  location: '',
  propertyType: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
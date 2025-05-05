import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import HomeServicesPage from './pages/HomeServicesPage';
import ProfilePage from './pages/ProfilePage';
import AddListingPage from './pages/AddListingPage';
import SavedPage from './pages/SavedPage';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buy" element={<BuyPropertiesPage />} />
          <Route path="rent" element={<RentPropertiesPage />} />
          <Route path="services" element={<HomeServicesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="add-listing" element={<AddListingPage />} />
          <Route path="saved" element={<SavedPage />} />
        </Route>
      </Routes>
    </AppContextProvider>
  );
}

export default App;
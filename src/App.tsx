import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import HomeServicesPage from './pages/HomeServicesPage';
import ProfilePage from './pages/ProfilePage';
import AddListingPage from './pages/AddListingPage';
import SavedPage from './pages/SavedPage';
import FindFriendsPage from './pages/FindFriendsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import { AppContextProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="buy">
                <Route index element={<BuyPropertiesPage />} />
                <Route path=":propertyId" element={<PropertyDetailsPage />} />
              </Route>
              <Route path="rent">
                <Route index element={<RentPropertiesPage />} />
                <Route path=":propertyId" element={<PropertyDetailsPage />} />
              </Route>
              <Route path="services" element={<HomeServicesPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="add-listing" element={<AddListingPage />} />
              <Route path="saved" element={<SavedPage />} />
              <Route path="find-friends" element={<FindFriendsPage />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
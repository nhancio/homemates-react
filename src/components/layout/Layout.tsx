import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNav from './MobileNav';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;
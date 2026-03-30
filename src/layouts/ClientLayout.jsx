import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-900 flex flex-col">
      {/* Header */}
      <Header />
      
      <main className="flex-grow w-full overflow-x-hidden max-w-[100vw]">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
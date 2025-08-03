import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AddProductForm from './components/AddProductForm';
import ProductTable from './components/ProductTable';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'add':
        return <AddProductForm onPageChange={setCurrentPage} />;
      case 'display':
        return <ProductTable onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
import React from 'react';
import { Package, Home, Plus, List } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'add', label: 'Add Product', icon: Plus },
    { id: 'display', label: 'Display Products', icon: List }
  ];

  return (
    <nav className="glass-card border-b border-white/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="floating-animation">
              <Package className="h-8 w-8 text-emerald-600 mr-3" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Product Catalog
            </span>
          </div>
          
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`nav-item inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
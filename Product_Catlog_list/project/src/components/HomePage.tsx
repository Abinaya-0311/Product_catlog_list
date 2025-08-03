import React from 'react';
import { Plus, List, Package, TrendingUp } from 'lucide-react';
import { productService } from '../service/ProductService';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const productCount = productService.getProductCount();
  const categoryCount = productService.getAllCategories().length;

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 fade-in">
          <div className="flex justify-center mb-6 floating-animation">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full pulse-glow">
              <Package className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Product Catalog System
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Manage your product inventory with ease. Add new products and view your entire catalog in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 slide-in">
          <div className="glass-card p-8 rounded-2xl card-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Total Products</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {productCount}
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl card-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl mr-4">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {categoryCount}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 fade-in">
          <button
            onClick={() => onPageChange('add')}
            className="group glass-card p-10 rounded-2xl card-shadow hover:card-shadow-hover card-hover text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Plus className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
              Add Product
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Add new products to your catalog with name, price, and category information.
            </p>
            <div className="text-emerald-600 font-semibold group-hover:text-emerald-700 flex items-center">
              Get started →
              <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <Plus className="h-4 w-4" />
              </div>
            </div>
          </button>

          <button
            onClick={() => onPageChange('display')}
            className="group glass-card p-10 rounded-2xl card-shadow hover:card-shadow-hover card-hover text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <List className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
              Display Products
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              View all products in your catalog organized in an easy-to-read table format.
            </p>
            <div className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center">
              View catalog →
              <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <List className="h-4 w-4" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
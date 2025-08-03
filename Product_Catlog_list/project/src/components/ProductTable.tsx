import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Trash2, Package, DollarSign } from 'lucide-react';
import { Product } from '../types/Product';
import { productService } from '../service/ProductService';

interface ProductTableProps {
  onPageChange: (page: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ onPageChange }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const loadProducts = () => {
    const allProducts = productService.getAllProducts();
    setProducts(allProducts);
    setCategories(productService.getAllCategories());
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.deleteProduct(id);
      loadProducts();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => onPageChange('home')}
            className="inline-flex items-center text-white/90 hover:text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>
        </div>

        <div className="glass-card rounded-2xl card-shadow fade-in">
          <div className="p-8 border-b border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mr-4 shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Product Catalog
                  </h1>
                  <p className="text-gray-600 text-lg">{filteredProducts.length} products found</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field pl-12"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center">
                <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {products.length === 0 
                    ? "Get started by adding your first product."
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
                <button
                  onClick={() => onPageChange('add')}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200/50">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="table-row-hover">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl mr-4 shadow-md">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-lg font-semibold text-gray-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center text-lg font-bold">
                          <div className="bg-green-500 p-1 rounded-full mr-2">
                            <DollarSign className="h-4 w-4 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-600">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                          title="Delete product"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredProducts.length > 0 && (
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-white/30 rounded-b-2xl">
              <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                <span>
                  Showing {filteredProducts.length} of {products.length} products
                </span>
                <div className="flex items-center space-x-6">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                    Total Value: {formatPrice(
                    filteredProducts.reduce((sum, product) => sum + product.price, 0)
                  )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
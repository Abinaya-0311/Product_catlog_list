import React, { useState } from 'react';
import { Plus, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { ProductFormData } from '../types/Product';
import { productService } from '../service/ProductService';

interface AddProductFormProps {
  onPageChange: (page: string) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onPageChange }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: ''
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const predefinedCategories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Food & Beverages',
    'Beauty & Health',
    'Automotive'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Product price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid number greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Product category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await productService.addProduct(formData);
      setShowSuccess(true);
      setFormData({ name: '', price: '', category: '' });
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrors({ name: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => onPageChange('home')}
            className="inline-flex items-center text-white/90 hover:text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>
        </div>

        <div className="glass-card rounded-2xl card-shadow p-10 fade-in">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl mr-4 shadow-lg">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Add New Product
            </h1>
          </div>

          {showSuccess && (
            <div className="mb-6 success-state rounded-xl p-4 flex items-center slide-in">
              <div className="bg-green-500 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Product added successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field form-input ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`input-field form-input ${
                  errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.price}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`input-field form-input ${
                  errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {predefinedCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.category}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Product...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
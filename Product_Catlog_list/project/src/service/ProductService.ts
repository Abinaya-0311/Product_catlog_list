import { Product, ProductFormData } from '../types/Product';
import { productRepository } from '../repository/ProductRepository';

class ProductService {
  getAllProducts(): Product[] {
    return productRepository.findAll();
  }

  getProductsByCategory(category: string): Product[] {
    return productRepository.findByCategory(category);
  }

  addProduct(productData: ProductFormData): Product {
    // Validate product data
    this.validateProductData(productData);
    
    const product = {
      name: productData.name.trim(),
      price: parseFloat(productData.price),
      category: productData.category.trim()
    };

    return productRepository.save(product);
  }

  deleteProduct(id: string): boolean {
    return productRepository.deleteById(id);
  }

  getProductById(id: string): Product | null {
    return productRepository.findById(id);
  }

  getAllCategories(): string[] {
    return productRepository.getCategories();
  }

  getProductCount(): number {
    return this.getAllProducts().length;
  }

  private validateProductData(productData: ProductFormData): void {
    if (!productData.name?.trim()) {
      throw new Error('Product name is required');
    }
    
    if (!productData.price || isNaN(parseFloat(productData.price))) {
      throw new Error('Valid product price is required');
    }
    
    if (parseFloat(productData.price) <= 0) {
      throw new Error('Product price must be greater than 0');
    }
    
    if (!productData.category?.trim()) {
      throw new Error('Product category is required');
    }
  }
}

export const productService = new ProductService();
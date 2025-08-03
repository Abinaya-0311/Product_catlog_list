import { Product } from '../types/Product';

class ProductRepository {
  private readonly STORAGE_KEY = 'products';

  findAll(): Product[] {
    const products = localStorage.getItem(this.STORAGE_KEY);
    return products ? JSON.parse(products) : [];
  }

  findByCategory(category: string): Product[] {
    const allProducts = this.findAll();
    return allProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  save(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.findAll();
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
      createdAt: new Date()
    };
    
    products.push(newProduct);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  }

  deleteById(id: string): boolean {
    const products = this.findAll();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (filteredProducts.length < products.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProducts));
      return true;
    }
    return false;
  }

  findById(id: string): Product | null {
    const products = this.findAll();
    return products.find(product => product.id === id) || null;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getCategories(): string[] {
    const products = this.findAll();
    const categories = products.map(product => product.category);
    return [...new Set(categories)];
  }
}

export const productRepository = new ProductRepository();
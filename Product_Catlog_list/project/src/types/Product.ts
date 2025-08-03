export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: Date;
}

export interface ProductFormData {
  name: string;
  price: string;
  category: string;
}
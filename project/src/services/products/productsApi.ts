import api from '../api';
import { Product } from '../../types';

interface ProductsResponse {
  success: boolean;
  data: Product[];
}

interface ProductResponse {
  success: boolean;
  data: Product;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<ProductsResponse>('/products');
    if (!response.data.success) {
      throw new Error('Failed to fetch products');
    }
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<ProductResponse>(`/products/${id}`);
    if (!response.data.success) {
      throw new Error('Failed to fetch product');
    }
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product');
  }
}; 
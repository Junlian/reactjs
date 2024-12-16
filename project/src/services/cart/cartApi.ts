import api from '../api';
import { CartItem } from '../../types';
import { CartApiResponse, CartSyncResponse } from './types';

export const syncCart = async (items: CartItem[]): Promise<CartSyncResponse> => {
  const response = await api.post<CartSyncResponse>('/cart/sync', { items });
  return response.data;
};

export const addToCart = async (productId: string, quantity: number): Promise<CartApiResponse> => {
  const response = await api.post<CartApiResponse>('/cart/items', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number): Promise<void> => {
  await api.patch(`/cart/items/${productId}`, { quantity });
};

export const removeCartItem = async (productId: string): Promise<void> => {
  await api.delete(`/cart/items/${productId}`);
};

export const clearCart = async (): Promise<void> => {
  await api.delete('/cart');
}; 
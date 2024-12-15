export interface User {
  id: string;
  email: string;
  name: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export * from './auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  store: Store;
  stock: number;
}

export interface Store {
  id: string;
  name: string;
  address: Address;
  rating: number;
  deliveryTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  createdAt: string;
  store: Store;
}
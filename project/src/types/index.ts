// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  addresses: Address[];
}

export type UserRole = 'customer' | 'premium' | 'store_owner' | 'admin';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  stock: number;
  store: Store;
  isAvailable: boolean;
}

export type ProductCategory = 'fruits' | 'vegetables' | 'dairy' | 'meat' | 'bakery' | 'beverages' | 'pantry';

export interface Store extends BaseEntity {
  name: string;
  address: Address;
  rating: number;
  deliveryTime: string;
  owner: User;
  isActive: boolean;
}

// Export other type modules
export * from './auth';
export * from './cart';
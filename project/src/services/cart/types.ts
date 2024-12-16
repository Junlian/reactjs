import { CartItem } from '../../types';

export interface CartApiResponse {
  success: boolean;
  message?: string;
  data?: {
    items: CartItem[];
    total: number;
  };
}

export interface CartSyncResponse {
  success: boolean;
  lastSynced: number;
} 
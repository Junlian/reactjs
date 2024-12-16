export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  lastUpdated: number;
}

export interface CartSummary {
  itemCount: number;
  total: number;
}

export interface OrderDetails {
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  total: number;
  deliveryFee: number;
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal';
  details: any; // Replace with specific payment details type
} 
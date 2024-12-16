import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../../types';
import * as cartApi from '../../services/cart/cartApi';

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  lastUpdated: Date.now(),
};

export const syncCart = createAsyncThunk(
  'cart/sync',
  async (_, { getState }) => {
    const { cart } = getState() as { cart: CartState };
    await cartApi.syncCart(cart.items);
    return cart.items;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ product, quantity }: { product: Product; quantity: number }) => {
    try {
      await cartApi.addToCart(product.id, quantity);
      return { product, quantity };
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        state.lastUpdated = Date.now();
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.total = calculateTotal(state.items);
      state.lastUpdated = Date.now();
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
        
        state.total = calculateTotal(state.items);
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      });
  },
});

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
};

export const { updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
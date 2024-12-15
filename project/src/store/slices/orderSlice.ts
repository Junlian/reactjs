import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  setOrders,
  setCurrentOrder,
  setLoading,
  setError,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
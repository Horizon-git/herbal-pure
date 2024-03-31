/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderDetails } from '../types/OrderDetails';
import { getOrderById } from '../services/orders';

export interface OrderDetailsState {
  orderDetails: OrderDetails | null;
  loading: boolean;
  hasError: boolean;
}

const initialState: OrderDetailsState = {
  orderDetails: null,
  loading: false,
  hasError: false,
};

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId: string) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const orderRes = await getOrderById(accessToken, orderId);

      return orderRes.data;
    }

    return null;
  },
);

export const orderDetailsSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderDetails.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default orderDetailsSlice.reducer;

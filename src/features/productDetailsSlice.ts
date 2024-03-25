/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../services/products';

export interface ProductDetailsState {
  productDetails: ProductDetails | null;
  loading: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  loading: false,
  hasError: false,
};

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string) => {
    const productDetails = await getProductDetails(productId);

    return productDetails.data;
  },
);

export const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default productDetailsSlice.reducer;

/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getProducts, getProductsByCategory } from '../services/products';

export interface ProductState {
  products: Product[];
  loading: boolean;
  hasError: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productsFromServer = await getProducts();

    return productsFromServer.data;
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: number) => {
    const productsFromServer = await getProductsByCategory(categoryId);

    return productsFromServer.data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.hasError = true;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;

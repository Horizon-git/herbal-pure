/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../types/Category';
import { getCategories } from '../services/categories';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  hasError: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  hasError: false,
};

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categoriesFromServer = await getCategories();

    return categoriesFromServer.data;
  },
);

export const categoriesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import productsReducer from '../features/productsSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import categoriesReducer from '../features/categoriesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

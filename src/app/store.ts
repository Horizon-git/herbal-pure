import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import productsReducer from '../features/productsSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import categoriesReducer from '../features/categoriesSlice';
// eslint-disable-next-line import/no-cycle
import authReducer from '../features/authSlice';
import orderDetailReducer from '../features/orderDetailsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    categories: categoriesReducer,
    auth: authReducer,
    orderDetails: orderDetailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

const cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');

type CartState = {
  cart: CartItem[];
  notification: boolean;
};

const initialState: CartState = {
  cart: cartProducts,
  notification: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<boolean>) => {
      state.notification = action.payload;
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cart, action.payload]),
      );
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.cart.find(item => item.id === action.payload.id);

      const filteredList = state.cart.filter(item => item !== findItem);

      localStorage.setItem('cart', JSON.stringify(filteredList));
      state.cart = filteredList;
    },
    changeQuantity(state, action: PayloadAction<CartItem>) {
      const findItem = state.cart.find(item => item.id === action.payload.id);

      console.log(findItem);

      if (findItem) {
        findItem.cartQuantity = action.payload.cartQuantity;
        localStorage.setItem('cart', JSON.stringify([...state.cart]));
      }
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  changeQuantity,
  showNotification,
} = cartSlice.actions;

export default cartSlice.reducer;

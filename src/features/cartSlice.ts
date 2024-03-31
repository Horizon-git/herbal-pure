/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

const cartProducts = JSON.parse(localStorage.getItem('cartHerbalPure') || '[]');

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: cartProducts,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      localStorage.setItem(
        'cartHerbalPure',
        JSON.stringify([...state.cart, action.payload]),
      );
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.cart.find(item => item.id === action.payload.id);

      const filteredList = state.cart.filter(item => item !== findItem);

      localStorage.setItem('cartHerbalPure', JSON.stringify(filteredList));
      state.cart = filteredList;
    },
    changeQuantity(state, action: PayloadAction<CartItem>) {
      const findItem = state.cart.find(item => item.id === action.payload.id);

      if (findItem) {
        findItem.cart_quantity = action.payload.cart_quantity;
        localStorage.setItem('cartHerbalPure', JSON.stringify([...state.cart]));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cartHerbalPure');
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  changeQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

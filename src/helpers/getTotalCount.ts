import { CartItem } from '../types/CartItem';

export const getTotalCount = (cart: CartItem[]) => {
  return cart.reduce((sum, obj) => {
    return obj.cartQuantity + sum;
  }, 0);
};

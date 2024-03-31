import { Product } from './Product';

export interface OrderDetails {
  id: number;
  products: {
    id: number;
    product: Product;
    quantity: number;
    total: number;
  }[];
  order_price: number;
}

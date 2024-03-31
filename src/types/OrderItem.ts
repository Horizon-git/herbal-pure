import { Product } from './Product';

export interface OrderItem {
  product: Product;
  total: number;
  quantity: number;
}

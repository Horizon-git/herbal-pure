import { OrderProduct } from './OrderProduct';

export interface Order {
  products: OrderProduct[];
  status: 'PENDING';
}

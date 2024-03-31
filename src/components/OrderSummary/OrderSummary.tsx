import React from 'react';
import './OrderSummary.scss';
import { OrderDetails } from '../../types/OrderDetails';
import { OrderSummaryItem } from '../OrderSummaryItem/OrderSummaryItem';

interface Props {
  order: OrderDetails;
}

export const OrderSummary: React.FC<Props> = ({ order }) => (
  <div className="order-summary" data-cy="summary">
    <h2 className="order-summary__title">Order Summary</h2>
    {order.products.map(productItem => (
      <OrderSummaryItem key={productItem.product.id} item={productItem} />
    ))}
    <div className="order-summary__total-block">
      <span className="order-summary__label">Grand total:</span>
      <span className="order-summary__total">{`$${order.order_price}`}</span>
    </div>
  </div>
);

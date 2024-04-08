import React from 'react';
import './OrderSummaryItem.scss';
import { Link } from 'react-router-dom';
import { OrderItem } from '../../types/OrderItem';

interface Props {
  item: OrderItem;
}

export const OrderSummaryItem: React.FC<Props> = ({ item }) => (
  <div className="order-item" data-cy="summary-item">
    <div className="order-item__left">
      <img
        src={item.product.image}
        alt={`${item.product.name}`}
        className="order-item__image"
      />
      <div className="order-item__info">
        <Link className="order-item__link" to={`/product/${item.product.slug}`}>
          {`${item.product.company}, ${item.product.name}`}
        </Link>
        <p className="order-item__qty">{`Qty: ${item.quantity}`}</p>
        {item.product.capsules_amount && (
          <p className="order-item__capsules">{`${item.product.capsules_amount} capsules`}</p>
        )}
      </div>
    </div>
    <div className="order-item__right">{`$${item.total}`}</div>
  </div>
);

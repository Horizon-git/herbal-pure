/* eslint-disable jsx-a11y/control-has-associated-label */
// CartItem.tsx

import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types/CartItem';
import { getDiscountedPrice } from '../../helpers/getDiscontedPrice';
import { useAppDispatch } from '../../app/hooks';
import { changeQuantity, removeCartItem } from '../../features/cartSlice';

interface Props {
  item: CartItem;
}

export const CartItemComponent: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let newCartQuantity = +e.target.value;

    if (newCartQuantity > item.total_amount) {
      newCartQuantity = item.total_amount;
    }

    if (newCartQuantity < 1) {
      newCartQuantity = 1;
    }

    const newItem = {
      ...item,
      cart_quantity: newCartQuantity,
    };

    dispatch(changeQuantity(newItem));
  };

  const removeFromCart = () => {
    dispatch(removeCartItem(item));
  };

  return (
    <tr className="cart__table-row" key={item.id}>
      <td className="cart__table-col">
        <img src={item.image} alt={item.name} className="cart__image" />
      </td>
      <td className="cart__table-col">
        <Link
          to={`/product/${item.slug}`}
          className="cart__product-name"
        >{`${item.company}, ${item.name}, ${`${item?.capsules_amount} capsules` || ''}`}</Link>
      </td>
      <td className="cart__table-col cart__table-col--small">
        <input
          type="number"
          value={item.cart_quantity}
          min={1}
          max={item.total_amount}
          className="cart__quantity"
          onChange={onChangeQuantity}
        />
      </td>
      <td className="cart__table-col cart__table-col--small">
        {`$${getDiscountedPrice(item.price * item.cart_quantity, item.discount)}`}
      </td>
      <td className="cart__table-col">
        <button type="button" className="cart__delete" onClick={removeFromCart}>
          <span className="icon icon--close" />
        </button>
      </td>
    </tr>
  );
};

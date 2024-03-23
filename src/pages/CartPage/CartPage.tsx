/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import { ChangeEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './CartPage.scss';
import { changeQuantity, removeCartItem } from '../../features/cartSlice';
import { CartItem } from '../../types/CartItem';

const linksObj = [
  { to: '/', label: 'Home' },
  { to: '/cart', label: 'Cart' },
];

export function CartPage() {
  const cart = useAppSelector(state => state.cart.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, obj) => {
        return obj.price * obj.cartQuantity + sum;
      }, 0),
    [cart],
  );

  const totalCount = useMemo(
    () =>
      cart.reduce((sum, obj) => {
        return obj.cartQuantity + sum;
      }, 0),
    [cart],
  );

  const onChangeQuantity = (
    item: CartItem,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    let newCartQuantity = +e.target.value;

    if (newCartQuantity > item.quantity) {
      newCartQuantity = item.quantity;
    }

    if (newCartQuantity < 1) {
      newCartQuantity = 1;
    }

    const newItem = {
      ...item,
      cartQuantity: newCartQuantity,
    };

    dispatch(changeQuantity(newItem));
  };

  const removeFromCart = (item: CartItem) => {
    dispatch(removeCartItem(item));
  };

  if (!cart.length) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__container">
          <h1 className="card-empty__title">Your shopping cart is empty</h1>
          <Link to="/store" className="cart-empty__link">
            Go to the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <Breadcrumbs links={linksObj} />
      <h1 className="cart__title">Cart</h1>
      <div className="cart__container">
        <table className="cart__table">
          <thead>
            <tr className="cart__header">
              <th className="cart__head-col">Image</th>
              <th className="cart__head-col">Product</th>
              <th className="cart__head-col">Quantity</th>
              <th className="cart__head-col">Total</th>
              <th className="cart__head-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr className="cart__table-row" key={item.id}>
                <td className="cart__table-col">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart__image"
                  />
                </td>
                <td className="cart__table-col">
                  <p className="cart__product-name">{`${item.supplier}, ${item.name}, ${`${item?.amount} capsules` || ''}, ${item.weight}g`}</p>
                </td>
                <td className="cart__table-col">
                  <input
                    type="number"
                    value={item.cartQuantity}
                    min={1}
                    max={item.quantity}
                    className="cart__quantity"
                    onChange={event => onChangeQuantity(item, event)}
                  />
                </td>
                <td className="cart__table-col">
                  {`$${item.price * item.cartQuantity}`}
                </td>
                <td className="cart__table-col">
                  <button
                    type="button"
                    className="cart__delete"
                    onClick={() => removeFromCart(item)}
                  >
                    <span className="icon icon--close" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart__summary">
          <div className="cart__summary-top">
            <h2 className="cart__summary-title">Cart total</h2>
            <div className="cart__summary-total">
              <p className="cart__summary-price">{`$${totalPrice}`}</p>
              <p className="cart__summary-qty">{`Total for ${totalCount} items`}</p>
            </div>
          </div>
          <button type="button" className="cart__checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

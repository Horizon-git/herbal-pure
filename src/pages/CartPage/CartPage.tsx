/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
// eslint-disable-next-line max-len
import { CartItemComponent } from '../../components/CartItemComponent/CartItemComponent';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './CartPage.scss';
import {
  getDiscountedPrice,
  roundToPointTwo,
} from '../../helpers/getDiscontedPrice';

const linksObj = [
  { to: '/', label: 'Home' },
  { to: '/cart', label: 'Cart' },
];

export function CartPage() {
  const cart = useAppSelector(state => state.cart.cart);

  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, obj) => {
        return (
          getDiscountedPrice(obj.price * obj.cart_quantity, obj.discount) + sum
        );
      }, 0),
    [cart],
  );

  const totalCount = useMemo(
    () =>
      cart.reduce((sum, obj) => {
        return obj.cart_quantity + sum;
      }, 0),
    [cart],
  );

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
              <CartItemComponent key={item.id} item={item} />
            ))}
          </tbody>
        </table>
        <div className="cart__summary">
          <div className="cart__summary-top">
            <h2 className="cart__summary-title">Cart total</h2>
            <div className="cart__summary-total">
              <p className="cart__summary-price">{`$${roundToPointTwo(totalPrice)}`}</p>
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

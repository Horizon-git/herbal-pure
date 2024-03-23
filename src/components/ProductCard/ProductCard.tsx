/* eslint-disable max-len */
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addCartItem,
  removeCartItem,
  showNotification,
} from '../../features/cartSlice';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const cart = useAppSelector(state => state.cart.cart);
  // const notification = useAppSelector(state => state.cart.notification);

  const dispatch = useAppDispatch();

  const isCart = useMemo(() => {
    return cart.some(item => item.id === product.id);
  }, [cart]);

  const addToCart = () => {
    const item = { ...product, cartQuantity: 1 };

    if (!isCart) {
      dispatch(addCartItem(item));
      dispatch(showNotification(true));
      setTimeout(() => {
        dispatch(showNotification(false));
      }, 1000);
    } else {
      dispatch(removeCartItem(item));
    }
  };

  // eslint-disable-next-line prettier/prettier
  const { imageUrl, name, price, discount, amount, supplier, weight, id } = product;

  return (
    <div className="card">
      <Link to={`/product/${id}`} className="card__link">
        <img src={`${imageUrl}`} alt={name} className="card__img" />
        <h2 className="card__title">{`${supplier}, ${name}, ${amount || ''} capsules, ${weight}g`}</h2>

        <div className="card__price">
          {discount === 0 ? (
            <p className="card__price-regular">{`$${price}`}</p>
          ) : (
            <>
              <p className="card__price-regular">
                {`$${(price * ((100 - discount) / 100)).toFixed(2)}`}
              </p>
              <p className="card__price-discount">{`$${price}`}</p>
            </>
          )}
        </div>
      </Link>

      <div className="card__buttons">
        <button
          type="button"
          data-cy="addToCart"
          className={classNames('add-to-cart', {
            'add-to-cart--active': isCart,
            'add-to-cart--disabled': product.quantity <= 0,
          })}
          disabled={product.quantity <= 0}
          onClick={addToCart}
        >
          {product.quantity <= 0 && 'Out of Stock'}
          {!isCart && product.quantity > 0 && 'Add to cart'}
          {isCart && product.quantity > 0 && 'Added to cart'}
        </button>
      </div>
    </div>
  );
};

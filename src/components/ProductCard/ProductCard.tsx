/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import { getDiscountedPrice } from '../../helpers/getDiscontedPrice';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const cart = useAppSelector(state => state.cart.cart);

  const dispatch = useAppDispatch();

  const isCart = useMemo(() => {
    return cart.some(item => item.id === product.id);
  }, [cart, product.id]);

  const addToCart = () => {
    const item = { ...product, cart_quantity: 1 };

    if (!isCart) {
      dispatch(addCartItem(item));
    } else {
      dispatch(removeCartItem(item));
    }
  };

  // eslint-disable-next-line prettier/prettier
  const { image, name, price, discount, capsules_amount, company, slug, total_amount, promoted  } = product;

  return (
    <div className="card">
      {(promoted || discount > 0) && (
        <span
          className={classNames('card__label', {
            'card__label--red': !promoted,
          })}
        >
          {promoted ? 'Top sales' : `-${discount * 100}%`}
        </span>
      )}

      <Link to={`/product/${slug}`} className="card__link">
        <img src={`${image}`} alt={name} className="card__img" />
        <h2 className="card__title">{`${company}, ${name}, ${`${capsules_amount} capsules` || ''}`}</h2>

        <div className="card__price">
          {discount === 0 ? (
            <p className="card__price-regular">{`$${price}`}</p>
          ) : (
            <>
              <p className="card__price-regular">
                {`$${getDiscountedPrice(price, discount)}`}
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
            'add-to-cart--disabled': total_amount <= 0,
          })}
          disabled={total_amount <= 0}
          onClick={addToCart}
        >
          {total_amount <= 0 && 'Out of Stock'}
          {!isCart && total_amount > 0 && 'Add to cart'}
          {isCart && total_amount > 0 && 'Added to cart'}
        </button>
      </div>
    </div>
  );
};

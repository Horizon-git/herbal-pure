/* eslint-disable max-len */
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCart.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
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
            'add-to-cart--active': false,
          })}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

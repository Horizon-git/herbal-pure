/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import { Loader } from '../../components/Loader/Loader';
import { fetchProducts } from '../../features/productsSlice';
import { Notification } from '../../components/Notification/Notification';
import { generateSlug } from '../../helpers/generateSlug';
import { getDiscountedPrice } from '../../helpers/getDiscontedPrice';



export const ProductDetailsPage = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const { productDetails, loading: loadingDetails, hasError: hasDetailsError } = useAppSelector(state => state.productDetails);
  const { products, hasError, loading} = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productCapsules = products.filter(product => product.company === productDetails?.company && product.name === productDetails?.name)
    .map(item => item.capsules_amount);

  const { productId = '' } = useParams();

  const linksObj = [
    { to: '/', label: 'Home' },
    { to: '/store', label: 'Store' },
    { to: `/product/${productDetails?.slug}`, label: productDetails?.name },
  ];


  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const isCart = useMemo(() => {
    return cart.some(item => item.id === productDetails?.id);
  }, [cart, productDetails?.id]);

  const addToCart = () => {
    if (productDetails) {
      const item = {
        id: productDetails.id,
        name: productDetails.name,
        image: productDetails.image,
        company: productDetails.company,
        price: productDetails.price,
        discount: productDetails.discount,
        promoted: productDetails.promoted,
        capsules_amount: productDetails.capsules_amount,
        total_amount: productDetails.total_amount,
        slug: productDetails.slug,
        cart_quantity: 1,
      };

      if (!isCart) {
        dispatch(addCartItem(item));
      } else {
        dispatch(removeCartItem(item));
      }
    }
  };

  if (loading || loadingDetails) {
    return <Loader />;
  }

  if (hasError || hasDetailsError) {
    return <div className="details__container">
      <Notification message='Server error, please try to reload page' />
    </div>;
  }

  return (
    <div className="details">
      {productDetails && (
        <div className="details__container">
          <Breadcrumbs links={linksObj} />
          <div className="details__top">
            <img
              src={productDetails.image}
              alt="productImage"
              className="details__image"
              onError={e => {
                // eslint-disable-next-line no-param-reassign
                (e.target as HTMLImageElement).src = 'img/no-image.png';
              }}
            />
            <div className="details__right">
              <h2 className="details__name">{`${productDetails.company}, ${productDetails.name}, ${`${productDetails.capsules_amount} capsules` || ''}`}</h2>
              <div className="details__price">
                {productDetails.discount === 0 ? (
                  <p className="details__price-regular">{`$${productDetails.price}`}</p>
                ) : (
                  <>
                    <p className="details__price-regular">
                      {`$${getDiscountedPrice(productDetails.price, productDetails.discount)}`}
                    </p>
                    <p className="details__price-discount">{`$${productDetails.price}`}</p>
                  </>
                )}
              </div>
              {productDetails.capsules_amount && (
                <div className="details__capsules-container">
                  <h3 className="details__capsules-title">{`Package quantity: ${productDetails.capsules_amount} Count`}</h3>
                  {productDetails.capsules_amount && (
                    <div className="details__capsules">
                      {productCapsules.map(capsuleCount => (
                        <Link key={capsuleCount} to={`/product/${generateSlug(productDetails.name, productDetails.company, capsuleCount, productDetails.category)}`}>
                          <div className={classNames('details__capsule-count', {
                            'details__capsule-count--active': capsuleCount ===  productDetails.capsules_amount
                          })}>
                            <span>{`${capsuleCount} count`}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <p className="details__description">{`${productDetails.description}`}</p>
              <p className="details__weight">{`Weight: ${productDetails.serving_size}`}</p>
              <button
                type="button"
                data-cy="addToCart"
                className={classNames('add-to-cart add-to-cart--details', {
                  'add-to-cart--active': isCart,
                })}
                onClick={addToCart}
              >
                {!isCart ? 'Add to cart' : 'Added to cart'}
              </button>
            </div>
          </div>
          <div className="details__bottom">
            <h2 className="details__overview">Product overview</h2>
            {productDetails.features && (
              <div className="details__features">
                <h3 className="details__title">Features</h3>
                <ul className="details__features-list">
                  {productDetails.features.map(feature => (
                    <li key={feature} className="details__feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <h3 className="details__title">Suggested use</h3>
            <p className="details__text">{productDetails.instruction}</p>
          </div>
        </div>
      )}
    </div>
  );
};

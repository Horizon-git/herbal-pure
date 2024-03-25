/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import { getSuggestedProducts } from '../../helpers/getSuggestions';
import { Loader } from '../../components/Loader/Loader';



export const ProductDetailsPage = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const { productDetails, loading } = useAppSelector(state => state.productDetails);
  const { products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const { productId = '' } = useParams();

  const linksObj = [
    { to: '/', label: 'Home' },
    { to: '/store', label: 'Store' },
    { to: `/product/${productDetails?.slug}`, label: productDetails?.name },
  ];

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const discountPrice = useMemo(() => {
    return productDetails?.price
      ? productDetails.price - (productDetails.price * (productDetails.discount || 0)) / 100
      : 0;
  }, [productDetails]);

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
        price: discountPrice,
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

  if (loading) {
    return <Loader />;
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
            />
            <div className="details__right">
              <h2 className="details__name">{`${productDetails.company}, ${productDetails.name}, ${`${productDetails.capsules_amount} capsules` || ''}`}</h2>
              <h3 className="details__price">{`$${discountPrice}`}</h3>
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
          <ProductSlider title="Recommended products" products={getSuggestedProducts(products, +productId, 8)} />
        </div>
      )}
    </div>
  );
};

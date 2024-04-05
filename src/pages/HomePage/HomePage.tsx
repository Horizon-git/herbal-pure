/* eslint-disable max-len */
import { useEffect } from 'react';
import { Banner } from '../../components/Banner/Banner';
import './HomePage.scss';
import './About.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { Loader } from '../../components/Loader/Loader';
import { getFeaturedProducts } from '../../helpers/getFeaturedProducts';
import { Notification } from '../../components/Notification/Notification';
import { PushNotification } from '../../components/PushNotification/PushNotification';
import { clearNotification } from '../../features/notificationSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, hasError } = useAppSelector(
    state => state.products,
  );
  const { notification } = useAppSelector(state => state.notification);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notification) {
        dispatch(clearNotification());
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  if (loading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="details__container">
        <Notification message="Server error, please try to reload page" />
      </div>
    );
  }

  return (
    <div className="home">
      <PushNotification
        message={`${notification.message}`}
        type={notification.type}
      />
      <Banner />
      <div className="home__container">
        <section className="about">
          <h1 className="about__title">About our company</h1>
          <div className="about__content">
            <p className="about__text">
              Welcome to HerbalPure, We are Ukrainian based company. Our mission
              is to provide our customers with the best selection of natural and
              organic supplements, vitamins, and health products available. We
              are committed to offering exceptional customer service, fast and
              reliable shipping, and a user-friendly shopping experience. <br />
              <br />
              At HerbalPure, we believe that everyone deserves to live a healthy
              and fulfilling life. That&apos;s why we offer a wide range of
              products to help you achieve your health and wellness goals. From
              vitamins and minerals to herbal supplements and superfoods, we
              have everything you need to support your body and mind. <br />
              <br />
              Our team is dedicated to sourcing only the highest-quality
              products from trusted brands. Our knowledgeable and friendly
              customer service team is always available to answer any questions
              you may have and help you find the products that are right for
              you. We offer fast and reliable shipping, so you can get the
              products you need when you need them.
            </p>
            <img
              src="img/about-us.webp"
              alt="about us"
              className="about__image"
            />
          </div>
        </section>
        {loading ? (
          <Loader />
        ) : (
          <ProductSlider
            title="Top sales"
            products={getFeaturedProducts(products)}
          />
        )}
      </div>
    </div>
  );
};

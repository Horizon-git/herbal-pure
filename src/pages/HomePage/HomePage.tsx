import { Banner } from '../../components/Banner/Banner';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import './HomePage.scss';
import './About.scss';

export const product: Product = {
  id: 1,
  imageUrl: 'img/product1.jpg',
  name: 'Zinc Picolinate',
  supplier: 'Solgar',
  weight: 100,
  amount: 100,
  discount: 0,
  price: 10.23,
};

export const products: Product[] = [
  {
    id: 1,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
  {
    id: 2,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 20,
    price: 10.23,
  },
  {
    id: 3,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
  {
    id: 4,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
  {
    id: 5,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
  {
    id: 6,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
  {
    id: 7,
    imageUrl: 'img/product1.jpg',
    name: 'Zinc Picolinate',
    supplier: 'Solgar',
    weight: 100,
    amount: 100,
    discount: 0,
    price: 10.23,
  },
];

export const HomePage = () => {
  return (
    <main className="home">
      <Banner />
      <div className="home__container">
        <ProductSlider title="Hot prices" products={products} />

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
        <ProductSlider title="Featured products" products={products} />
      </div>
    </main>
  );
};

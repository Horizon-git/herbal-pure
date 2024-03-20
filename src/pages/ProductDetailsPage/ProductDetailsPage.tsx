/* eslint-disable max-len */
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { products } from '../../data/products';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './ProductDetailsPage.scss';

export const product: ProductDetails = {
  id: 1,
  imageUrl: 'img/product1.jpg',
  name: 'Product 1',
  supplier: 'Supplier 1',
  weight: 100,
  amount: 100,
  discount: 10,
  price: 50,
  categoryId: '1.1',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur erat diam, non iaculis ex dictum ut. Aenean sit amet odio nisi. Vestibulum vel dolor et justo sollicitudin tincidunt. Mauris eleifend elit metus. Fusce blandit nulla at massa venenatis, sed tincidunt nisl tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur erat diam, non iaculis ex dictum ut. Aenean sit amet odio nisi.',
  // features: `
  // <ul>
  //   <li>Some feature</li>
  //   <li>Some feature</li>
  //   <li>Some feature</li>
  //   <li>Some feature</li>
  // </ul>`,
  features: [
    'Some feature1',
    'Some feature2',
    'Some feature3',
    'Some feature4',
  ],
  instruction:
    'Take 1 capsule daily, with or without food. Best when taken as directed by a qualified healthcare professional.',
};

const linksObj = [
  { to: '/', label: 'Home' },
  { to: '/store', label: 'Store' },
  { to: `/product/${product.id}`, label: product.name },
];

export const ProductDetailsPage = () => {
  const {
    // id,
    // imageUrl,
    name,
    supplier,
    weight,
    amount,
    // discount,
    price,
    // categoryId,
    description,
    features,
    instruction,
  } = product;

  return (
    <main className="details">
      <div className="details__container">
        <Breadcrumbs links={linksObj} />
        <div className="details__top">
          <img
            src={product.imageUrl}
            alt="productImage"
            className="details__image"
          />
          <div className="details__right">
            <h2 className="details__name">{`${supplier}, ${name}, ${amount || ''} capsules`}</h2>
            <h3 className="details__price">{`$${price}`}</h3>
            <p className="details__description">{`${description}`}</p>
            <p className="details__weight">{`Weight: ${weight}g`}</p>
            <button
              type="button"
              data-cy="addToCart"
              className={classNames('add-to-cart add-to-cart--details', {
                'add-to-cart--active': false,
              })}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="details__bottom">
          <h2 className="details__overview">Product overview</h2>
          <div className="details__features">
            <h3 className="details__title">Features</h3>
            <ul className="details__features-list">
              {features.map(feature => (
                <li key={feature} className="details__feature-item">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: features }} /> */}
          <h3 className="details__title">Suggested use</h3>
          <p className="details__text">{instruction}</p>
        </div>
        <ProductSlider title="Recommended products" products={products} />
      </div>
    </main>
  );
};

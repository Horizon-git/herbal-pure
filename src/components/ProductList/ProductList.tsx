import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(ProductList);

import { Product } from '../types/Product';

export const getFeaturedProducts = (items: Product[]) => {
  const featuredProducts = [...items].filter(item => item.promoted);

  return featuredProducts;
};

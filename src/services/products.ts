import { apiClient } from '../http';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return apiClient.get<Product[]>('/products/');
};

export const getProductsByCategory = (categoryId: number) => {
  return apiClient.get<Product[]>(`/products?category=${categoryId}`);
};

export const getProductDetails = (slug: string) => {
  return apiClient.get<ProductDetails>(`/products/${slug}`);
};

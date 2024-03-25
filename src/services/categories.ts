import { apiClient } from '../http';
import { Category } from '../types/Category';

export const getCategories = () => {
  return apiClient.get<Category[]>('/categories/');
};

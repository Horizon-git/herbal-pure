import { apiClient } from '../api/apiClient';
import { Category } from '../types/Category';

export const getCategories = () => {
  return apiClient.get<Category[]>('/categories/');
};

/* eslint-disable no-restricted-syntax */
import { Category } from '../types/Category';

export const findCategoryById = (
  id: number,
  categories: Category[],
): Category | undefined => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }

    if (category.subcategories.length > 0) {
      const foundSubcategory = findCategoryById(id, category.subcategories);

      if (foundSubcategory) {
        return foundSubcategory;
      }
    }
  }

  return undefined;
};

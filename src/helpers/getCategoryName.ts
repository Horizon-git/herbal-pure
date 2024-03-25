import { Category } from '../types/Category';

export function findCategoryById(
  id: string,
  categories: Category[],
): Category | undefined {
  const foundCategory = categories.find(category => {
    if (category.id === id) {
      return true;
    }

    if (category.subcategories) {
      const foundSubcategory = findCategoryById(id, category.subcategories);

      return !!foundSubcategory;
    }

    return false;
  });

  return foundCategory;
}

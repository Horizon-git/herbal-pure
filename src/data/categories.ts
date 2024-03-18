/* eslint-disable no-restricted-syntax */
export function findCategoryById(
  id: string,
  categories: Category[],
): Category | undefined {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }

    if (category.subcategories) {
      const foundSubcategory = findCategoryById(id, category.subcategories);

      if (foundSubcategory) {
        return foundSubcategory;
      }
    }
  }

  return undefined;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    subcategories: [
      { id: '1.1', name: 'Laptops' },
      { id: '1.2', name: 'Smartphones' },
      { id: '1.3', name: 'Tablets' },
    ],
  },
  { id: '2', name: 'Fashion' },
  { id: '3', name: 'Home & Garden' },
  { id: '4', name: 'Sports & Outdoors' },
  { id: '5', name: 'Toys & Games' },
];

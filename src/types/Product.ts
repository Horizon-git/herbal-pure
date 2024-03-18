export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  supplier: string;
  price: number;
  discount: number;
  amount: number | null;
  weight: number;
  categoryId: string;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  company: string;
  capsules_amount: number | null;
  price: number;
  discount: number;
  promoted: boolean;
  total_amount: number;
  slug: string;
  serving_size: string;
};

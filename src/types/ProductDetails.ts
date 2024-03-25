export type ProductDetails = {
  id: number;
  image: string;
  name: string;
  company: string;
  price: number;
  discount: number;
  capsules_amount: number | null;
  serving_size: number;
  description: string;
  features: string[];
  total_amount: number;
  instruction: string;
  promoted: boolean;
  category: string;
  slug: string;
};

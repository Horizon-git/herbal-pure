export interface CartItem {
  id: number;
  imageUrl: string;
  name: string;
  supplier: string;
  price: number;
  discount: number;
  amount: number | null;
  weight: number;
  quantity: number;
  categoryId: string;
  cartQuantity: number;
}

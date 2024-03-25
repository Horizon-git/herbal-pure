export const getDiscountedPrice = (price: number, discount: number) => {
  return Math.round(price * ((100 - discount) / 100) * 100) / 100;
};

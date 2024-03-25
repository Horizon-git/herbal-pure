export const roundToPointTwo = (value: number) => {
  return Math.round(value * 100) / 100;
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return roundToPointTwo(price * ((100 - discount) / 100)) || 0;
};

export const calculateDiscountedPrice = (originalPrice = 0, discount = 0) => {
  return originalPrice - originalPrice * (discount / 100);
};
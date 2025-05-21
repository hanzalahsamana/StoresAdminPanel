export const getValidGlobalDiscount = (discounts, totalOrderCost) => {
  const globalDiscount = discounts?.find((d) => d.discountType === "global");

  if (globalDiscount) {
    const isActive = globalDiscount.isActive;
    const isNotExpired = new Date(globalDiscount.expiryDate) > new Date();
    const hasMinOrderAmount = globalDiscount.minOrderAmount;
    const isOrderEligible =
      !hasMinOrderAmount || totalOrderCost > globalDiscount.minOrderAmount;

    if (isActive && isNotExpired && isOrderEligible) {
      return globalDiscount;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const formatAmount = (amount) => {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getValidDiscountAmount = (discount, totalOrderCost) => {
  if (discount) {
    let discountAmount = 0;
    if (discount.amountType === "percent") {
      discountAmount = (totalOrderCost * discount.amount) / 100;
    } else if (discount.amountType === "fixed") {
      discountAmount = discount.amount;
    }
    return discountAmount;
  }
  return 0;
};

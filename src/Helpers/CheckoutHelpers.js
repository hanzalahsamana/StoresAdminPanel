export const getValidGlobalDiscount = (discounts, totalOrderCost) => {
  const globalDiscount = discounts?.find((d) => d.discountType === "global");

  if (globalDiscount) {
    
    const isActive = globalDiscount.isActive;
    const isNotExpired = new Date(globalDiscount.expiryDate) > new Date();
    const hasMinOrderAmount = globalDiscount.minOrderAmount;
    const isOrderEligible =
    !hasMinOrderAmount || totalOrderCost > globalDiscount.minOrderAmount;
    
    if (isActive && isNotExpired && isOrderEligible) {
      const discountAmount =
      globalDiscount.amountType === "percent"
      ? (totalOrderCost * globalDiscount.amount) / 100
      : globalDiscount.amount;
      return {
        amountType: globalDiscount.amountType,
        amount: globalDiscount.amount,
        discountAmount,
        name: globalDiscount.name,
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getValidVariant = (product, selectedVariant) => {
  let mergedData = {
    image: product.displayImage,
    price: product.price,
    stock: product.stock,
  };

  product?.variantRules?.forEach((rule) => {
    const [matchKey] = Object.keys(rule).filter(
      (k) => !["image", "price", "stock"].includes(k)
    );
    const matchValue = rule[matchKey];

    if (selectedVariant[matchKey] === matchValue) {
      console.log(mergedData, rule, "👓👓");
      mergedData = { ...mergedData, ...rule };
    }
  });

  Object.keys(selectedVariant).forEach((key) => {
    delete mergedData[key];
  });

  return mergedData;
};

export const totalCalculate = (data) => {
  const total = data?.reduce(
    (accumulator, item) => accumulator + (item?.quantity || 0),
    0
  );
  return total;
};

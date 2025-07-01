export const cleanObjectFields = (obj, fieldsToRemove = ['_id', '__v', 'storeRef', 'productId', 'updatedAt', 'createdAt']) => {
  const cleaned = { ...obj };
  fieldsToRemove.forEach((key) => {
    delete cleaned[key];
  });
  return cleaned;
};

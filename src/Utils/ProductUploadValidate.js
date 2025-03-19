export const productUploadValidate = (formData, setErrors) => {
  const newErrors = {};
  const {
    name,
    brand,
    originalPrice,
    discount,
    collectionName,
    type,
    size,
    stock,
    images,
  } = formData;

  if (!name) newErrors.name = "name is required";
  if (!brand) newErrors.brand = "brand Name is required";
  if (!originalPrice || originalPrice == 0)
    newErrors.originalPrice = "original Price is required";
  if (discount > 90 || discount < 0) newErrors.discount = "max discount is 90%";
  if (!collectionName) newErrors.collectionName = "collectionName is required";
  if (!type) newErrors.type = "type is required";
  if (size.length === 0) newErrors.size = "size is required";
  if ((!stock && stock !== 0) || stock < 0)
    newErrors.stock = "stock must be greater or equal then zero";
  if (!images.length > 0) newErrors.image = "Please select min 1 image.";
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

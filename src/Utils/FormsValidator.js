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
  if (!size?.length > 0) newErrors.size = "size is required";
  if ((!stock && stock !== 0) || stock < 0)
    newErrors.stock = "stock must be greater or equal then zero";
  if (!images?.length > 0) newErrors.image = "Please select min 1 image.";
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export const paymentFormValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, country, firstName, lastName, address, city, phone } =
    formData;

  if (!email) newErrors.email = "email is required";
  if (!country) newErrors.country = "Country is required";
  if (!firstName) newErrors.firstName = "First name is required";
  if (!lastName) newErrors.lastName = "Last name is required";
  if (!address) newErrors.address = "Address is required";
  if (!city) newErrors.city = "City is required";
  if (!phone) newErrors.phone = "Phone number is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const pageDataValidate = (componentMapping, formData) => {
  const validationRules = {
    title: (value) => value.trim() !== "" || "Title is required",
    email: (value) => /\S+@\S+\.\S+/.test(value) || "Invalid email format",
    phone: (value) => /^[\d\s\+\-()]+$/.test(value) || "Phone must be valid",
    address: (value) => value.trim() !== "" || "Address is required",
    text: (value) => value.trim() !== "" || "Text is required",
    image: (value) => value !== "" || "Image is required",
    faqs: (value) => {
      if (!Array.isArray(value) || value.length === 0) {
        return "FAQs must have at least one entry";
      }
      for (let i = 0; i < value.length; i++) {
        const faq = value[i];
        if (!faq.Q || !faq.A) {
          return `FAQ ${i + 1} must have both a question and an answer`;
        }
      }
      return true;
    },
  };
  const fields = componentMapping[formData?.type]?.fields || [];
  const errors = [];

  fields.forEach((field) => {
    const validate = validationRules[field];
    if (validate) {
      const error = validate(formData[field]);
      if (error !== true) {
        errors.push(error);
      }
    }
  });

  return errors;
};

export const userResgisterValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, password } = formData;

  if (!email) newErrors.email = "Email is required";
  if (!password) {
    newErrors.password = "Password is required";
  } else if (!/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/.test(password)) {
    newErrors.password =
      "Password must be at least 6 characters and must not contain spaces.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const userLoginValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, password } = formData;

  if (!email) newErrors.email = "Email is required";
  if (!password) newErrors.password = "Password is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

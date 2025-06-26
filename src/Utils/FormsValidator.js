// utils/validation.js

export const productUploadValidate = (formData, setErrors) => {
  const newErrors = {};
  const {
    name,
    vendor,
    price,
    comparedAtPrice,
    displayImage,
    gallery,
    collections,
    stock,
    status,
    showStock,
    pronouce,
    wantsCustomerReview,
    description,
    metaTitle,
    metaDescription,
    note,
    variations,
    variantRules,
    ratings,
  } = formData;

  // Required
  if (!name?.trim()) newErrors.name = "Product name is required";
  if (price === undefined || price === null || isNaN(price) || price <= 0)
    newErrors.price = "Price must be a number greater than 0";
  if (!displayImage) newErrors.displayImage = "Display image is required";
  if (stock === undefined || stock === null || isNaN(stock) || stock < 0)
    newErrors.stock = "Stock must be 0 or more";

  // Optional validations
  if (status && !["active", "inactive"].includes(status)) {
    newErrors.status = "Status must be 'active' or 'inactive'";
  }

  if (variations && Array.isArray(variations)) {
    for (let i = 0; i < variations.length; i++) {
      const variation = variations[i];
      if (!variation.name?.trim()) {
        newErrors[`variations[${i}].name`] = "Variation name is required";
      }
      if (!Array.isArray(variation.options) || variation.options.length === 0) {
        newErrors[`variations[${i}].options`] =
          "At least one option is required";
      }
    }

    // Unique variation names
    const names = variations.map((v) => v.name?.toLowerCase().trim());
    const duplicates = names.filter(
      (name, i) => name && names.indexOf(name) !== i
    );
    if (duplicates.length > 0) {
      newErrors.variations = "Variation names must be unique";
    }
  }

  if (ratings) {
    if (
      (ratings.average && isNaN(ratings.average)) ||
      (ratings.count && isNaN(ratings.count))
    ) {
      newErrors.ratings = "Ratings must contain valid numbers";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const paymentFormValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, country, firstName, lastName, address, city, phone } =
    formData;

  if (!email?.trim()) newErrors.email = "Email is required";
  if (!country) newErrors.country = "Country is required";
  if (!firstName?.trim()) newErrors.firstName = "First name is required";
  if (!lastName?.trim()) newErrors.lastName = "Last name is required";
  if (!address?.trim()) newErrors.address = "Address is required";
  if (!city?.trim()) newErrors.city = "City is required";
  if (!phone?.trim()) newErrors.phone = "Phone number is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const pageDataValidate = (componentMapping, formData) => {
  const validationRules = {
    title: (val) => val?.trim() !== "" || "Title is required",
    email: (val) => /\S+@\S+\.\S+/.test(val) || "Invalid email format",
    phone: (val) => /^[\d\s\+\-()]+$/.test(val) || "Phone must be valid",
    address: (val) => val?.trim() !== "" || "Address is required",
    text: (val) => val?.trim() !== "" || "Text is required",
    image: (val) => val !== "" || "Image is required",
    faqs: (val) => {
      if (!Array.isArray(val) || val.length === 0) {
        return "At least one FAQ is required";
      }
      for (let i = 0; i < val.length; i++) {
        if (!val[i]?.Q || !val[i]?.A) {
          return `FAQ ${i + 1} is incomplete`;
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
      const result = validate(formData[field]);
      if (result !== true) errors.push(result);
    }
  });

  return errors;
};

export const userRegisterValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, password } = formData;

  if (!email?.trim()) newErrors.email = "Email is required";
  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6 || /\s/.test(password)) {
    newErrors.password =
      "Password must be at least 6 characters with no spaces";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const userLoginValidate = (formData, setErrors) => {
  const newErrors = {};
  const { email, password } = formData;

  if (!email?.trim()) newErrors.email = "Email is required";
  if (!password) newErrors.password = "Password is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const updatePaymentMethodValidate = (methodKey, data, setErrors) => {
  const newErrors = {};

  console.log(data);
  

  switch (methodKey) {
    case "cod":
      // No credential validation needed
      break;

    case "jazzcash":
      if (!data?.merchantId?.trim()) {
        newErrors["merchantId"] = "Merchant ID is required";
      }
      if (!data?.pp_Password?.trim()) {
        newErrors["pp_Password"] = "Password is required";
      }
      if (!data?.integritySalt?.trim()) {
        newErrors["integritySalt"] = "Integrity Salt is required";
      }
      break;

    case "easypaisa":
      if (!data?.merchantId?.trim()) {
        newErrors["merchantId"] = "Merchant ID is required";
      }
      if (!data?.apiKey?.trim()) {
        newErrors["apiKey"] = "API Key is required";
      }
      break;

    default:
      newErrors.general = "Unsupported payment method";
      break;
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors((prev) => ({
      ...prev,
      [methodKey]: newErrors,
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      [methodKey]: null,
    }));
  }
  return Object.keys(newErrors).length === 0;
};

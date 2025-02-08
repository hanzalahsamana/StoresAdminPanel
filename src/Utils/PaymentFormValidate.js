export const paymentFormValidate = (formData) => {
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

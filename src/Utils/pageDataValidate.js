const validationRules = {
  title: (value) => value.trim() !== "" || "Title is required",
  email: (value) => /\S+@\S+\.\S+/.test(value) || "Invalid email format",
  phone: (value) => /^\d+$/.test(value) || "Phone must be numeric",
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

export const validateForm = (componentMapping, formData) => {
  const fields = componentMapping[formData?.type] || [];
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

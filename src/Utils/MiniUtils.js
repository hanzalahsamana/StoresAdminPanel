

import { toast } from "react-toastify";

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

export const ConvertArray = (size) => {
  if (typeof size === "string") {
    return size.split();
  }
  return size;
};

export const cleanObjectFields = (obj, fieldsToRemove = ['_id', '__v', 'storeRef', 'productId', 'updatedAt', 'createdAt']) => {
  const cleaned = { ...obj };
  fieldsToRemove.forEach((key) => {
    delete cleaned[key];
  });
  return cleaned;
};


import { toast } from "react-toastify";

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Id Copied");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

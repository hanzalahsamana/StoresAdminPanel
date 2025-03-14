import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../config";

export const uploadImagesToS3 = async (brand, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/${brand}/uploadMultiple`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrls;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Failed to upload images"
    );
  }
};

export const uploadSingleImageToS3 = async (brand, image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `${BASE_URL}/${brand}/uploadSingle`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  } catch (error) {
    throw new Error(error.response?.data?.message || error?.message || "Failed to upload image");
  }
};

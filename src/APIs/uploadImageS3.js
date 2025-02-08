import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../config";

export const uploadImagesToS3 = async (brnad , files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/${brnad}/uploadMultiple`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Uploaded Image URLs:", response.data.imageUrls);
    return response.data.imageUrls;
  } catch (error) {
    toast.error("Upload failed:", error);
    return [];
  }
};

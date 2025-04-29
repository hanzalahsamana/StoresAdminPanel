import axios from "axios";
import BASE_URL from "../../../config";

export const importSite = async (token, file , selectedKeys) => {
  try {

    const formData = new FormData();
    formData.append("file", file);


    const params = new URLSearchParams();
    selectedKeys.forEach((data) => params.append("selectedKeys", data));

    const response = await axios.post(`${BASE_URL}/importSiteData?${params.toString()}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.message;
  } catch (error) {
    throw error;
  }
};

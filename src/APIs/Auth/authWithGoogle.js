import axios from "axios";
import Base_URL from "../../../config";

export const authWithGoogle = async (data) => {
  try {
    const apiUrl = `${Base_URL}/authWithGoogle`;
    const response = await axios.post(apiUrl, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

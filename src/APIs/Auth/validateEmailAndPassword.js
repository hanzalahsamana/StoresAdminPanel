import axios from "axios";
import Base_URL from "../../../config";

export const ValidateEmailAndPassword = async (data) => {
  try {
    const apiUrl = `${Base_URL}/validateEmailAndPassword`;
    const response = await axios.post(apiUrl, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

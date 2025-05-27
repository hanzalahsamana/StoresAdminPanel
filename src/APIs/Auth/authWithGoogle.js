import axios from "axios";
import Base_URL from "../../../config";

export const signInWithGoogle = async (data) => {
  try {
    const apiUrl = `${Base_URL}/signInWithGoogle`;
    const response = await axios.post(apiUrl, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUpWithGoogle = async (data) => {
  try {
    const apiUrl = `${Base_URL}/signUpWithGoogle`;
    const response = await axios.post(apiUrl, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

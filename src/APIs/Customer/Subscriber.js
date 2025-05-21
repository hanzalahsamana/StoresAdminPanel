import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";

export const addSubscriber = async (type, email) => {
  try {
    let url = `${BASE_URL}/${type}/addSubscriber`;
    const response = await axios.post(url, { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

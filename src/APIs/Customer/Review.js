import axios from "axios";
import BASE_URL from "../../../config";

export const addReview = async (storeId, productId, payload) => {
  try {
    let url = `${BASE_URL}/${storeId}/addReview?productId=${productId}`;
    const {data} = await axios.post(url, payload);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReview = async (storeId, productId) => {
  try {
    let url = `${BASE_URL}/${storeId}/getReviews?productId=${productId}`;
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    return console.error(error);
  }
};

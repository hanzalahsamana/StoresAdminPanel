import axios from 'axios';
import BASE_URL from '../../../config';

export const addOrderDataApi = async (type, orderDetail) => {
  try {
    let url = `${BASE_URL}/${type}/addOrderData`;
    const response = await axios.post(url, orderDetail);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

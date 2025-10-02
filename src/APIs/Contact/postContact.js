import axios from 'axios';
import BASE_URL from '../../../config';

export const postContact = async (siteName, contactData) => {
  try {
    let url = `${BASE_URL}/${siteName}/postContact`;
    const response = await axios.post(url, contactData);
    return response.message;
  } catch (error) {
    throw new Error(error);
  }
};

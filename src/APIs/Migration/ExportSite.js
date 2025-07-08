import axios from 'axios';
import BASE_URL from '../../../config';

export const exportSite = async (token, storeId, selectedOptions) => {
  try {
    const params = new URLSearchParams();
    selectedOptions.forEach((data) => params.append('selectedData', data));
    const response = await axios.get(`${BASE_URL}/${storeId}/exportSiteData?${params.toString()}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const text = await response.data.text();
    // const data = JSON.parse(text);

    return response;
  } catch (error) {
    throw error;
  }
};

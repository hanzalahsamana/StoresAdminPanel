import axios from 'axios';
import BASE_URL from '../../config';

export const uploadImagesToS3 = async (token, storeId, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  try {
    const response = await axios.post(`${BASE_URL}/${storeId}/uploadImages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.imageUrls;
  } catch (error) {
    throw error;
  }
};

export const uploadSingleImageToS3 = async (token, storeId, image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post(`${BASE_URL}/${storeId}/uploadSingle`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    throw error;
  }
};

import axios from 'axios';
import BASE_URL from '../../../config';
import { addGalleryImage, deleteGalleryImages, setGallery, setGalleryLoading } from '@/Redux/Gallery/GallerySlice';
import { dispatch } from '@/Redux/Store';

export const getGalleryImages = async (token, storeId) => {
  try {
    dispatch(setGalleryLoading(true));

    const { data } = await axios.get(`${BASE_URL}/${storeId}/getImages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setGallery(data?.images));
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(setGalleryLoading(false));
  }
};

export const uploadImage = async (token, storeId, image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await axios.post(`${BASE_URL}/${storeId}/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addGalleryImage(data.image));

    return data.image;
  } catch (error) {
    throw error;
  }
};

export const deleteGalleryImagesApi = async (token, storeId, imageIds) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${storeId}/deleteImages?imageIds=${imageIds?.join(',')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteGalleryImages(imageIds));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

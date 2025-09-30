import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { deleteProductData, setProductLoading } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const deleteProduct = async (token, storeId, productId) => {
  try {
    dispatch(setProductLoading(true));
    const response = await axios.delete(`${BASE_URL}/${storeId}/deleteProduct?id=${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteProductData(!Array.isArray(productId) ? [productId] : productId));
    toast.success(response.data.message);
    return response.data.message;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  } finally {
    dispatch(setProductLoading(false));
  }
};

import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { addPage, setEditingPage, setPageData, setPageLoading, setPages } from '@/Redux/Pages/PagesSlice';

// Save Draft Page
export const saveDraftPage = async (token, storeId, payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${storeId}/saveDraft`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.data;
  } catch (error) {
    console.error('Save draft error:', error);
    throw error;
  } finally {
  }
};

// Publish Page
export const publishPage = async (token, storeId, payload) => {
  try {
    // dispatch(setPageLoading(true));

    const { data } = await axios.post(`${BASE_URL}/${storeId}/publishPage`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch(setPageData({ page: data.data, mode: 'published' }));
  } catch (error) {
    console.error('Publish error:', error);
    throw error;
  } finally {
    // dispatch(setPageLoading(false));
  }
};

// Get Draft Page (fallback to published)
export const getDraftPage = async (token, storeId, slug) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getDraftPage?slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setEditingPage(data?.data));
    return data;
  } catch (error) {
    console.error('Get draft error:', error);
    throw error;
  }
};

// Get Published Page
export const getPublishedPage = async (token, storeId, slug) => {
  try {
    dispatch(setPageLoading(true));

    const { data } = await axios.get(`${BASE_URL}/page/${storeId}/${slug}/published`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPageData({ page: data.data, mode: 'published' }));
  } catch (error) {
    console.error('Get published error:', error);
    throw error;
  } finally {
    dispatch(setPageLoading(false));
  }
};

// Get All Pages
export const getAllPages = async (token, storeId) => {
  try {
    dispatch(setPageLoading(true));
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getAllPages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setPages(data?.data));
    return data?.data;
  } catch (error) {
    console.error('Get draft error:', error);
    throw error;
  } finally {
    dispatch(setPageLoading(false));
  }
};

export const createPage = async (token, storeId, payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${storeId}/createPage`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(addPage(data?.data));
  } catch (error) {
    console.error('create page error:', error);
    throw error;
  }
};

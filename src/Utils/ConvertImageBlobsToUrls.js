import { uploadImagesToS3, uploadSingleImageToS3 } from '@/APIs/uploadImageS3';

export const convertImageBlobsToUrlsPreview = (data, keysToCheck = ['image', 'imagesUrl']) => {
  if (!data || typeof data !== 'object') return data;

  const updated = { ...data };

  keysToCheck.forEach((key) => {
    const value = updated[key];

    if (!value) return;

    // Single image case
    if (value instanceof File || value instanceof Blob) {
      updated[key] = URL.createObjectURL(value);
    }

    // Array of images case
    else if (Array.isArray(value)) {
      updated[key] = value.map((item) => (item instanceof File || item instanceof Blob ? URL.createObjectURL(item) : item));
    }
  });

  return updated;
};

export const convertImageBlobsToUrlsPublish = async (token, storeId, formData) => {
  try {
    const updatedData = { ...formData };

    // Handle single image upload
    if (formData?.image instanceof File) {
      const uploadedImageUrl = await uploadSingleImageToS3(token, storeId, formData.image);
      updatedData.image = uploadedImageUrl;
    }

    // Handle multiple images upload (imagesUrl)
    if (Array.isArray(formData?.imagesUrl)) {
      const existingUrls = formData.imagesUrl.filter((image) => typeof image === 'string');
      const imagesToUpload = formData.imagesUrl.filter((image) => image instanceof File);

      if (imagesToUpload.length > 0) {
        const uploadedImagesUrls = await uploadImagesToS3(token, storeId, imagesToUpload);
        updatedData.imagesUrl = [...existingUrls, ...uploadedImagesUrls];
      } else {
        updatedData.imagesUrl = existingUrls;
      }
    }

    return updatedData;
  } catch (error) {
    throw error;
  }
};

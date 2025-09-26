import isEqual from 'lodash/isEqual';

/**
 * Prepare payload with only changed fields
 * @param {Object} originalData - Original data (product fetched from DB)
 * @param {Object} updatedData - Updated data (user edited values)
 * @returns {Object} payload - Only changed fields
 */
export const getEditFields = (originalData, updatedData) => {
  const payload = {};

  Object.keys(updatedData).forEach((key) => {
    if (!isEqual(originalData[key], updatedData[key])) {
      payload[key] = updatedData[key];
    }
  });

  return payload;
};

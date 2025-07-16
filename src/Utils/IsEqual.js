export const IsEqual = (obj1, obj2) => {
  // If both are the same reference, return true
  if (obj1 === obj2) return true;

  // If either is not an object, return false
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

  // Get the keys of both objects and compare their lengths
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  // Compare each key-value pair recursively
  for (let key of keys1) {
    if (!keys2.includes(key) || !IsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const IsArrayEqual = (arr1, arr2) => {
  // If both are the same reference
  if (arr1 === arr2) return true;

  // Check if both are arrays
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;

  // Check length
  if (arr1.length !== arr2.length) return false;

  // Check each item
  for (let i = 0; i < arr1.length; i++) {
    const val1 = arr1[i];
    const val2 = arr2[i];

    const areObjects = typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null;

    if (areObjects) {
      // Recursively compare arrays or objects
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (!IsArrayEqual(val1, val2)) return false;
      } else if (!Array.isArray(val1) && !Array.isArray(val2)) {
        if (!IsEqual(val1, val2)) return false;
      } else {
        return false; // One is array, one is object
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};

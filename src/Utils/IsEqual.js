export const IsEqual = (obj1, obj2) => {
  // If both are the same reference, return true
  if (obj1 === obj2) return true;

  // If either is not an object, return false
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return false;

  // Get the keys of both objects and compare their lengths
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  // Compare each key-value pair recursively
  for (let key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const ConvertArray = (size) => {
  if (typeof size === "string") {
    return size.split();
  }
  return size;
};

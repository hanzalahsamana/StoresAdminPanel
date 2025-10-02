export const readSiteById = (str) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: str });
    }, 2000);
  });
};

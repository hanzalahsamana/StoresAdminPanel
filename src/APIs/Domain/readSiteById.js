export const readSiteById = (str) => {
  console.log(str , "okhl");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: str });
    }, 2000);
  });
};

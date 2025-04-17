export const Base_Domain =
  process.env.NODE_ENV === "production"
    ? "xperiode.com"
    : "localhost:3000";
export const HTTP =
  process.env.NODE_ENV === "production" ? "https://" : "http://";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.hannanfabrics.com/api/v1"
    : "https://api.hannanfabrics.com/api/v1";

export default BASE_URL;

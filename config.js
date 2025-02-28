export const Base_Domain =
  process.env.NODE_ENV === "production"
    ? "hannanfabrics.com"
    : "localhost:3000";
export const HTTP =
  process.env.NODE_ENV === "production"
    ? "https://"
    : "http://";

const BASE_URL = "https://xperiode.com/api/v1"
// const BASE_URL = "http://localhost:8081/api/v1";
export default BASE_URL;

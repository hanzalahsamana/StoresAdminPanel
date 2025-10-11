export const Base_Domain = process.env.NODE_ENV === 'production' ? 'designsli.com' : 'localhost:3000';
export const HTTP = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.designsli.com/api/v1'
    : // : "https://dev.hannanfabrics.com/api/v1"
      'http://localhost:1234/api/v1';

export default BASE_URL;

'use client';

import axios from 'axios';
import BASE_URL from '../../../config';

export const addDomainDns = async (domain, sitename) => {
  try {
    const response = await axios.post(`${BASE_URL}/${sitename}/addDomainDns`, { domain });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const genrateSSl = async (domain) => {
  try {
    const response = await axios.post(`${BASE_URL}/${'abc'}/genrateSSl`, { userDomain: domain });
    return response.data;
  } catch (error) {
    throw error;
  }
};
